import * as zmq from "zeromq";
import fs from 'fs';
import readline from 'readline';

const sock = new zmq.Reply();

await sock.bind('tcp://*:3003').then(
  console.log('"Quote" Server running on socket 3003') 
)


async function loadDict(filePath) {
  const fileStream = fs.createReadStream(filePath);
  let combinationDict = {}
  // Create an interface to read the file line by line
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    const [combination, result] = line.split(',')
    combinationDict[combination] = result
  }
  return combinationDict;
}

const combDict = await loadDict('./combinations.csv')

while (true) {
  for await (const [msg] of sock) {
    let req = msg.toString()
    console.log('Received ' + ': [' + req + ']');
    if (req == "Q") {
      break
    }
    else if(req.includes("ANALYSIS")){
      let result = ''
      const key = req.split(':')[1]
      combDict[key] ? result = combDict[key] : result = 'Error'
      sock.send(result)
    }
  }
}