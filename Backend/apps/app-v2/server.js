const express = require("express");
const app = express();

const PORT = 3002;

const server = app.listen(PORT, () => {
  console.log(`App v2 running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Version 2 🚀");
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. v2 shutting down...`);
  server.close(() => {
    console.log("v2 closed all connections.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("v2 forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

app.get("/version", (req, res) => {
  res.json({ version: "v2" });
});
