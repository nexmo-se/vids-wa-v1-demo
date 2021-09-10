require('dotenv').config();
var jwt = require('jsonwebtoken');
var base64 = require('js-base64');
var axios = require('axios');

var privateKey = process.env.PRIVATE_KEY;
var current = Date.now();

function Post(req, res) {
  console.log('Got here');
  var from = req.body.to; // REVERSE NUMBERS
  var to = req.body.from; // REVERSE NUMBERS
}
module.exports = { Post };
