require('dotenv').config();
const axios = require('axios');
const { getDistance } = require('./distance');
const { sendLocationList, sendLocation } = require('./sendMessage');
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

var myCoordinate = {
  address: '4230 Calle Sonesta Las Cruces NM 88011',
  coordinate: { latitude: 32.35200981651978, longitude: -106.73193933320883 },
};

var coordinates = [
  {
    location: 'CA',
    address: '501 2nd Street, San Francisco, CA 94107',
    coordinate: { latitude: 37.7831414522531, longitude: -122.39353735060365 },
  },
  {
    location: 'TX',
    address: '6185 Retail Rd, Dallas, TX 75231',
    coordinate: { latitude: 32.8618189480859, longitude: -96.75381282187956 },
  },
  {
    location: 'MN',
    address: '1644 Robert St, South Saint Paul, MN 55118',
    coordinate: { latitude: 44.89641247927625, longitude: -93.08047696151723 },
  },
  {
    location: 'NJ',
    address: '23 Main Street. Holmdel, NJ 07733',
    coordinate: { latitude: 40.3455080877937, longitude: -74.19037453356064 },
  },
];

// STEP_1: Fetch (latitude and longitude) of an address
function getCoordinate(req, res, address) {
  var urlifiedAddress = address.replace(/ /g, '%20');
  axios(
    `https://api.geo.codes/v1/address/geocode?q=${urlifiedAddress}&api_key=${GEOCODE_API_KEY}`
  ).then((res) => {
    // console.log('RES.DATA', res.data);
    // STEP_2: Compare coordinate to list of coordinates
    coordinates.forEach((obj) => {
      var miles = getDistance(
        res.data.coordinate.latitude,
        res.data.coordinate.longitude,
        obj.coordinate.latitude,
        obj.coordinate.longitude
      );
      // Step_3: Add miles to address to new object.
      obj.milesToAddress = miles;
    });
    // Step_4: Sort objects in ascending order
    coordinates.sort((a, b) => {
      return a.milesToAddress - b.milesToAddress;
    });
    // console.log(coordinates);
    sendLocationList(req, res, coordinates);
  });
}

function getOneCoordinate(req, res, address) {
  var urlifiedAddress = address.replace(/ /g, '%20');
  axios(
    `https://api.geo.codes/v1/address/geocode?q=${urlifiedAddress}&api_key=${GEOCODE_API_KEY}`
  ).then((res) => {
    // console.log('RES.DATA', res.data);

    let lat = res.data.coordinate.latitude;
    let lon = res.data.coordinate.longitude;
    sendLocation(req, res, address, lat, lon);
  });
}

module.exports = { getCoordinate, getOneCoordinate };
