const express = require("express");
const server = express();

const projectRouter = require("./data/routes/projectRoute")
const actionRouter = require("./data/routes/actionRoute")

server.use(express.json());
server.use("/projects", projectRouter)
server.use("/actions", actionRouter)

server.get('/', (req, res) => {
  res.send(`<h1>This is Aiden API!</h1>`)
});

module.exports = server;