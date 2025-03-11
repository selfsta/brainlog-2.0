import express from 'express';
import * as zmq from "zeromq";

const app = express();
const port = 3003;

// Create and connect a ZeroMQ Request socket to the ZeroMQ server
const zmqSocket = new zmq.Request();
zmqSocket.connect('tcp://localhost:5550')
console.log("Connected to ZeroMQ Analysis server at tcp://localhost:5550");

app.get('/analysis/:key', async (req, res) => {
  const key = req.params.key;
  try {
    // Send "ANALYSIS" to the ZeroMQ server
    await zmqSocket.send(`ANALYSIS:${key}`);
    const result = await zmqSocket.receive();
    const resultStr = result.toString("utf-8"); // Convert buffer to string
    res.status(200).json(resultStr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze" });
  }
});

app.listen(port, () => console.log(`Analysis API Server running on http://localhost:${port}`));
