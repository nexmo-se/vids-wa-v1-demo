// A dummy utils.js for local development
// You need to have sample.json located in `./src/sample.json`
import sample from './sample.json';

module.exports = {
  getDb: () => {},
  getNexmo: () => {
    return sample;
  },
  getIdFromJWT: (token) => {},
  getIniStuff: () => {
    return sample;
  },
};
