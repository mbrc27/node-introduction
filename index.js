const http = require("http");
const { getBusesByLocation } = require("./bus");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  getBusesByLocation()
    .then(buses => {
      res.statusCode = 200;
      res.end(JSON.stringify(buses, null, 2));
    })
    .catch(err => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

server.listen(3000);

console.log("Server listening on port 3000");
