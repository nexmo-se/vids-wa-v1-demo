require('dotenv').config();
var jwt = require('jsonwebtoken');
var base64 = require('js-base64');
var axios = require('axios');

var privateKey = process.env.PRIVATE_KEY;
var current = Date.now();

function sendList() {
  var data = JSON.stringify({
    from: '12019758605', // 12019758605
    to: '15754947093', // 15754947093
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: 'Select which pill you would like ',
        },
        body: {
          text: 'You will be presented with a list of options',
        },
        footer: {
          text: 'There are no wrong choices',
        },
        action: {
          button: 'Select',
          sections: [
            {
              title: 'Section A - pills',
              rows: [
                {
                  id: 'row1',
                  title: 'Red',
                  description: 'Take the red pill',
                },
                {
                  id: 'row2',
                  title: 'Blue',
                  description: 'Take the blue pill',
                },
                {
                  id: 'row3',
                  title: 'Green',
                  description: 'Take the green pill',
                },
              ],
            },
            {
              title: 'Section B - no pills',
              rows: [
                {
                  id: 'row4',
                  title: 'Nothing',
                  description: "Don't take a pill",
                },
              ],
            },
          ],
        },
      },
    },
  });

  jwt.sign(
    {
      application_id: process.env.VIDS_APP_ID,
      iat: current,
      jti: '' + current,
    },
    privateKey,
    { algorithm: 'RS256' },
    function (err, token) {
      if (token) {
        console.log('\n✅ Received token\n', token);
      } else {
        console.log('\n💀 Unable to fetch token, token:', err);
      }
      // REQUEST TO VONAGE
      var config = {
        method: 'post',
        url: 'https://api.nexmo.com/v1/messages', // 'You did not provide correct credentials.', // Fixed by setting PrivateKey to string and adding \n
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log('\n✅ ', JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

module.exports = sendList;
