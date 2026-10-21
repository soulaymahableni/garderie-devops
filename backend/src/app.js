const express = require("express");
const cors = require("cors");
const { garderie, services, activites } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Ma Garderie", endpoints: ["/api/garderie", "/api/services", "/api/activites"] });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/garderie", (req, res) => res.json(garderie));
app.get("/api/services", (req, res) => res.json(services));
app.get("/api/activites", (req, res) => res.json(activites));

app.use((req, res) => res.status(404).json({ error: "Route introuvable" }));

module.exports = app;
