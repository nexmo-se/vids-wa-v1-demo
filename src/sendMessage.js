require('dotenv').config();
var jwt = require('jsonwebtoken');
// var base64 = require('js-base64');
var axios = require('axios');

// ON EC2 INSTANCE, DOTENV DOES NOT WORK HERE, THE STRING IS NECESSARY WITH /N
var privateKey = process.env.PRIVATE_KEY;
var current = Date.now();

function startDemo(req, res) {
  var body = req.body;
  var data = JSON.stringify({
    from: '12019758605',
    to: req.body.phone,
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'template',
      template: {
        namespace: "9b6b4fcb_da19_4a26_8fe8_78074a91b584",
        name: "vids_interactive_demo",
        language: {
          policy: "deterministic",
          code: "en"
        }
      }
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
        console.log('\n💀 Unable to fetch token, error:', err);
      }
      var config = {
        method: 'post',
        url: 'https://api.nexmo.com/v1/messages',
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

          console.log('🗞️  Sending to frontend Data:', data, ' and Body: ', body)
          res.status(200).send({data, body}); 
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );

}

function sendGreeting(req, res, textToSend) {
  console.log('sendGreeting req.body:', req.body)
  var body = req.body;
  var data = JSON.stringify({
    from: '12019758605',
    to: req.body.from,
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
          text: textToSend,
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

          // {{data: [{message_uuid: "1234"}]},{body: {id: "uuid", phone: "+"}}}
          res.status(200).send({data, body}); 
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function lightOrDark(req, res, textToSend) {
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
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
          text: textToSend,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'slot-1',
                title: 'LIGHT',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'slot-2',
                title: 'DARK',
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
          res.status(200).send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function sendListShade(req, res, textToSend) {
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: 'Select which shirt you would like to see',
        },
        body: {
          text: `We have this new cotton shirt in stock in multiple ${textToSend} colors.`,
        },
        footer: {
          text: 'There are no wrong choices',
        },
        action: {
          button: 'Select',
          sections: [
            {
              title: 'Section A - shirt',
              rows: [
                {
                  id: 'row1',
                  title: 'Red',
                  description: 'See the red shirt',
                },
                {
                  id: 'row2',
                  title: 'Blue',
                  description: 'See the blue shirt',
                },
                {
                  id: 'row3',
                  title: 'Green',
                  description: 'See the green shirt',
                },
              ],
            },
            {
              title: 'Section B - no shirt',
              rows: [
                {
                  id: 'row4',
                  title: 'Nothing',
                  description: "Don't take a shirt",
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
          res.status(200).send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function sendBtnImage(req, res, textToSend, baseURL) {
  console.log(`${baseURL}/images/${textToSend}600x600.png`);
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: 'image',
          image: {
            // link: 'https://cdn.shopify.com/s/files/1/1368/3463/products/PACIFICBLUECREWCURVE-HEM2.jpg?v=1627512351',
            link: `${baseURL}/images/${textToSend}600x600.png`,
          },
        },
        body: {
          text: `Here's our ${textToSend} Short sleeve Shirt. Would you like to order? Press Yes to find a store near you.`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'slot-1',
                title: 'Yes',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'slot-2',
                title: 'No',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'slot-3',
                title: 'Visit Website',
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
          res.status(200).send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function sendText(req, res, textToSend) {
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
    channel: 'whatsapp',
    message_type: 'text',
    text: textToSend,
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
      var config = {
        method: 'post',
        url: 'https://api.nexmo.com/v1/messages',
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
          res.status(200).send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function sendLocationList(req, res, coordinates) {
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: 'List of stores closest to your address',
        },
        body: {
          text: 'Please select one in the list',
        },
        footer: {
          text: 'There are no wrong choices',
        },
        action: {
          button: 'Select',
          sections: [
            {
              title: 'Store neares you',
              rows: [
                {
                  id: 'address1',
                  title: `${coordinates[0].location} ${coordinates[0].milesToAddress} miles away`,
                  description: `${coordinates[0].address}`,
                },
                {
                  id: 'address2',
                  title: `${coordinates[1].location} ${coordinates[1].milesToAddress} miles away`,
                  description: `${coordinates[1].address}`,
                },
                {
                  id: 'address3',
                  title: `${coordinates[2].location} ${coordinates[2].milesToAddress} miles away`,
                  description: `${coordinates[2].address}`,
                },
                {
                  id: 'address4',
                  title: `${coordinates[3].location} ${coordinates[3].milesToAddress} miles away`,
                  description: `${coordinates[3].address}`,
                },
              ],
            },
            // {
            //   title: 'Select to Exit',
            //   rows: [
            //     {
            //       id: 'address5',
            //       title: 'Exit',
            //       description: 'Close this list',
            //     },
            //   ],
            // },
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
          // res.send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

function sendLocation(req, res, address, lat, lon) {
  var data = JSON.stringify({
    from: req.body.to, // REVERSE TO SEND
    to: req.body.from, // REVERSE TO SEND
    channel: 'whatsapp',
    message_type: 'custom',
    custom: {
      type: 'location',
      location: {
        longitude: lon,
        latitude: lat,
        name: address,
        address: address,
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
          // res.send(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
}

module.exports = {
  startDemo,
  sendGreeting,
  lightOrDark,
  sendListShade,
  sendBtnImage,
  sendText,
  sendLocationList,
  sendLocation,
};
