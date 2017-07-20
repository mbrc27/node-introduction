const Promise = require("bluebird");
const _ = require("lodash");
const fetch = require("isomorphic-fetch");
const readFile = Promise.promisify(require("fs").readFile);

const BUS_API_URL = "https://api.um.warszawa.pl/api/action/busestrams_get";
const BUS_API_KEY = "d3cd9ec8-1920-43c7-a557-8a0e8443cc93";
const LOCATION_API_URL = "http://ipinfo.io/json";

const getLocation = () => {
  return fetch(LOCATION_API_URL).then(response => {
    if (response.status !== 200) throw new Error("Bad request");
    return response.json();
  });
};

const getBuses = () => {
  return fetch(
    `${BUS_API_URL}/?resource_id=%20f2e5503e-%20927d-4ad3-9500-4ab9e55deb59&apikey=${BUS_API_KEY}&type=1&line=503`
  ).then(response => {
    if (response.status !== 200) throw new Error("Bad request");
    return response.json();
  });
};

const getBusesByLocation = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getLocation(), getBuses()])
      .then(responses => {
        const [{ loc }, busData] = responses;
        const location = { lat: +loc.split(",")[0], lon: +loc.split(",")[1] };
        const buses = busData.result;
        const busesInRange = _.chain(buses)
          .filter(
            bus =>
              bus.Lat - location.lat <= 0.1 && bus.Lon - location.lon <= 0.1
          )
          .intersectionBy("Lines")
          .value();

        resolve(busesInRange);
      })
      .catch(err => reject(err));
  });
};

module.exports = { getBusesByLocation };
//exports.getBuses;
