const express = require("express");
const client = require("prom-client");
const app = express();

// Create a Registry
const register = new client.Registry();

// Collect default system metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Home route
app.get("/", (req, res) => {
  res.send("Hello from Node.js App 🚀");
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
