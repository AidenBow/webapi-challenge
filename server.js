const express = require("express");
const server = express();

const projectRouter = require("./data/routes/projectRoute")

server.use(express.json());
server.use("/projects", projectRouter)

server.get('/', (req, res) => {
  res.send(`<h1>This is Aiden API!</h1>`)
});

module.exports = server;