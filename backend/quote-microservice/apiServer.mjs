import express from 'express';
import * as zmq from "zeromq";

const app = express();
const port = 3002;

// Create and connect a ZeroMQ Request socket to the ZeroMQ server
const zmqSocket = new zmq.Request();
zmqSocket.connect('tcp://localhost:5555')
console.log("Connected to ZeroMQ Quote server at tcp://localhost:5555");

app.get('/quote', async (req, res) => {
  try {
    // Send "NQUOTE" to the ZeroMQ server
    await zmqSocket.send("NQUOTE");
    const [result] = await zmqSocket.receive();
    const resultStr = result.toString();
    // Split the result into quote and url variables
    const [quote, url] = resultStr.split(',"');
    res.json({ quote, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve quote" });
  }
});

app.listen(port, () => console.log(`API Server running on http://localhost:${port}`));
