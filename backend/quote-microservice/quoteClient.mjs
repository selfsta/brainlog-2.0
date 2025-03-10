import * as zmq from "zeromq"

async function runClient() {
  //  Socket to talk to server
  const sock = new zmq.Request();
  sock.connect('tcp://localhost:5555');

  await sock.send('NQUOTE');
  const [result] = await sock.receive();
  const [quote, url] = result.toString().split(',"')
  console.log(quote)
  console.log(url)
}

runClient();
