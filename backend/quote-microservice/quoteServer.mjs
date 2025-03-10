import * as zmq from "zeromq";
import fs from 'fs';
import readline from 'readline';

const sock = new zmq.Reply();

await sock.bind('tcp://*:5555').then(
  console.log('"Quote" Server running on socket 5555') 
)


async function getLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read the file line by line
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let currentLine = 0;
  let quote = null;
  let ranInt = Math.floor(Math.random() * 50);
  
  for await (const line of rl) {
    // When the desired line is reached, assign it to quote and exit the loop
    if (currentLine === ranInt) {
      quote = line;
      break;
    }
    currentLine++;
  }
  return quote;
}

while (true) {
  for await (const [msg] of sock) {
    let req = msg.toString()
    console.log('Received ' + ': [' + req + ']');
    // Do some 'work'
    if (req == "Q") {
      break
    }
    else if(req == "NQUOTE"){
      getLine('./quotes.csv')
      .then((line) => {
      sock.send(line);
      console.log('Sent Response')
      })
      .catch((err) => {
      console.error('Error reading the file:', err);
      });
    }
  }
}