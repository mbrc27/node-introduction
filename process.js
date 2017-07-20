//process.argv.forEach((val, index) => console.log(`${index}: ${val}`));

console.log("start");
process.nextTick(() => console.log("tick!"));
console.log("stop");
