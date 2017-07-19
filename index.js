const fs = require("fs");

// fs.readFile("/etc/hosts", "utf8", (err, data) => {
//   if (err) return console.error(err);
//   return console.log(data);
// });

// var data = fs.readFileSync("/etc/hosts", "utf8");
// console.log(data);

const readline = require("readline");
let data = "";
const stream = fs.createReadStream("./income.txt");

// stream.on("error", err => console.error(err));

// stream.on("data", chunk => {
//   data += chunk;
//   console.log(`Chunk of data: ${chunk}`);
// });

// stream.on("end", () => console.log(data));

const readLineStream = readline.createInterface({
  input: stream,
  output: process.stdout,
  terminal: false
});

readLineStream.on("line", chunk => {
  data += chunk;
  console.log(`Chunk of data: ${chunk}`);
});

readLineStream.on("close", () => console.log(data));
