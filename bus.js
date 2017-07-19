const fs = require("fs");

const location = { lon: 21.0518, lat: 52.1296 };

const getBuses = cb => {
  fs.readFile("./503.json", "utf8", (err, data) => {
    if (err) return console.error(err);

    const buses = JSON.parse(data).result;
    busesInRange = buses
      .filter(
        bus =>
          bus.Lat - location.lat <= 0.001 && bus.Lon - location.lon <= 0.001
      )
      .reduce((prev, next) => {
        const lines = prev.map(bus => bus.Lines);
        if (lines.indexOf(next.Lines) <= -1) prev.push(next);
        return prev;
      }, []);
    cb(busesInRange);
  });
};

module.exports = { getBuses };
//exports.getBuses;
