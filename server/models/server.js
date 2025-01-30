const express = require("express");
const socketIO = require("socket.io");
const { createServer } = require("http");
const { resolve, join } = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = createServer(this.app);
    this.io = socketIO(this.server);

    this.paths = {};

    this.routes();
    this.sockets();
  }

  routes() {
    const publicPath = resolve(__dirname, "../../public");
    this.app.use(express.static(publicPath));
    this.app.use(express.static(join(__dirname, "public")));
  }

  sockets() {
    module.exports.io = socketIO(this.server);
    require("../sockets/sockets")
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

module.exports = Server;
