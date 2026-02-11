const express = require("express");
const app = express();

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`App v1 running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Version 1");
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. v1 shutting down...`);
  server.close(() => {
    console.log("v1 closed all connections.");
    process.exit(0);
  });

  // Force exit if not closed in 10 sec
  setTimeout(() => {
    console.error("v1 forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown); // CTRL+C

app.get("/version", (req, res) => {
  res.json({ version: "v1" });
});
