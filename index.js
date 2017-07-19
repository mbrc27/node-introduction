const { getBuses } = require("./bus");

getBuses().then(buses => console.log(buses)).catch(err => console.error(err));
