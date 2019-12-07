var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(7777);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const namespaceOne = io.of("/namespaceOne");

namespaceOne.on("connection", function(socket) {
  console.log("message", "user is connected");
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    socket.emit("message", "user disconnected");
  });
});
