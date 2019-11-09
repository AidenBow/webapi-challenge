const express = require("express");
const server = express();

const projectRouter = require("./data/routes/projectRoute")
const actionRouter = require("./data/routes/actionRoute")

server.use(express.json());
server.use(logger)
server.use("/projects", projectRouter)
server.use("/actions", actionRouter)

server.get('/', (req, res) => {
  res.send(`<h1>This is Aiden API!</h1>`)
});

function logger(req, res, next) {
  console.log(`${Date()} ${req.method} ${req.url} ${res.statusCode}`)
  next();
};

module.exports = server;