require('dotenv').config();
const fetch = require('node-fetch');
const { getDistance } = require('./distance');
const sendList = require('./sendList');
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
function getCoordinate(fromNumber, toNumber, address) {
  var urlifiedAddress = address.replace(/ /g, '%20');
  fetch(
    `https://api.geo.codes/v1/address/geocode?q=${urlifiedAddress}&api_key=${GEOCODE_API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      var list = [];
      // STEP_2: Compare coordinate to list of coordinates
      coordinates.forEach((obj) => {
        var miles = getDistance(
          json.coordinate.latitude,
          json.coordinate.longitude,
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
      console.log('here.');
      // console.log(coordinates);
      sendList.locations(fromNumber, toNumber, coordinates);
    });
}

module.exports = { getCoordinate };
