const Promise = require("bluebird");
const _ = require("lodash");
const readFile = Promise.promisify(require("fs").readFile);

const location = { lon: 21.0518, lat: 52.1296 };

const getBuses = cb => {
  return new Promise((resolve, reject) => {
    readFile("./503.json", "utf8")
      .then(data => {
        const buses = JSON.parse(data).result;
        const busesInRange = _.chain(buses)
          .filter(
            bus =>
              bus.Lat - location.lat <= 0.001 && bus.Lon - location.lon <= 0.001
          )
          .intersectionBy("Lines")
          .value();

        resolve(busesInRange);
      })
      .catch(err => reject(err));
  });
};

module.exports = { getBuses };
//exports.getBuses;
