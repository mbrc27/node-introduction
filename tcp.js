const net = require("net");

// net.createServer(socket => {
//     socket.write("Hello!");

//     socket.on("data", data => console.log(`Got: ${data}`));

//     socket.on("end", () => console.log("bye"));
//   })
//   .listen(1337);
// console.log("Listening on 1337");

//netcat localhost 1337

var host = process.argv[2];
var port = +process.argv[3];

var socket = net.connect(port, host);
socket.setEncoding("utf8");

socket.once("data", chunk => {
  console.log(`Data: ${chunk.trim()}`);
});

// node tcp.js localhost 22
