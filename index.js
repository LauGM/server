/*import Express from "express";
import Http from "http";
import Socketio from "socket.io";
Http.Server(Express);
Socketio(Http, {
  cors: {
    origin: "*",
  },
});*/
const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});

let position = {
  x: 300,
  y: 100,
};

let bienvenida="Bienvenidos al juego";

Socketio.on("connection", (socket) => {
  socket.emit("position", position);
  socket.emit("bienvenida", bienvenida);
  socket.on("move", (data) => {
    switch (data) {
      case "left":
        position.x -= 5;
        Socketio.emit("position", position);
        break; 
      case "right":
        position.x += 5;
        Socketio.emit("position", position);
        break;
      case "up":
        position.y -= 5;
        Socketio.emit("position", position);
        break;
      case "down":
        position.y += 5;
        Socketio.emit("position", position);
        break;
    }
  });
  socket.on("respuesta", (respuesta) => {
    bienvenida += "\n"+respuesta;
    Socketio.emit("bienvenida",bienvenida);
  });
});

Http.listen(3000, () => {
  console.log("Server up and running...");
});
