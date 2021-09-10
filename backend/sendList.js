require('dotenv').config();
var jwt = require('jsonwebtoken');
var base64 = require('js-base64');
var axios = require('axios');

var privateKey = process.env.PRIVATE_KEY;
var current = Date.now();

function sendList(req, res) {
  var data = JSON.stringify({
    from: '12019758605', // 12019758605
    to: req.body.phone, // 15754947093
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: 'text',
          text: 'Shopping Interactive',
        },
        body: {
          text: "Hello, I'm Sierra, the virtual shopping assitant. I can help you when we have new designs available. If you don't want to hear from me again, just select or type LEAVE, otherwise type STAY",
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'slot-1',
                title: 'LEAVE',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'slot-2',
                title: 'STAY',
              },
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
        console.log('✅ Received token\n', token);
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
          console.log('✅ ', JSON.stringify(response.data));
          var data = [];
          data.push(response.data);
          // console.log(data[0].message_uuid);
          res.send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

module.exports = sendList;
