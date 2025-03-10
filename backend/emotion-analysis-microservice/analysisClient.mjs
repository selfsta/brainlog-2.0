import * as zmq from "zeromq"

async function runClient() {
console.log('Connecting to hello world server…');

  //  Socket to talk to server
  const sock = new zmq.Request();
  sock.connect('tcp://localhost:5555');

  const testEmo = ['Joy', 'Fear']

  const keyDict = {
    'joy': 'J',
    'love': 'L',
    'fear': 'F',
    'sadness': 'S',
    'surprise': 'U',
    'anger': 'A'
  }
  
  let keyStr = ''
  for (let emotion of testEmo) {
    emotion = emotion.toLowerCase()
    const parsedEmo = keyDict[emotion]
    keyStr += parsedEmo
  }

  await sock.send(`ANALYSIS:${keyStr}`);
  const [result] = await sock.receive();
  console.log('Received ', result.toString());
}

runClient();
