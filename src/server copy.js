require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const Pusher = require('pusher');
// const { v4: uuidv4 } = require('uuid');

let app = express();
let port = 8046;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static('build'));
app.use('/images', express.static('images'));
const { registerWA, removeRegWA } = require('./register');
const {
  sendGreeting,
  lightOrDark,
  sendListShade,
  sendBtnImage,
  sendText,
  startDemo,
} = require('./sendMessage');

const { getCoordinate, getOneCoordinate } = require('./coordinate');

var phoneNumber = '';
const waNumber = '12019758605';
const baseURL = 'https://vids.vonage.com/wav1';
const url = 'https://vids.vonage.com/wav1/inbound';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS,
});

// var pushData = [];
var phoneIDs = [];
var ID = '';

function matchID(id) {
  for (const property in phoneIDs) {
    console.log(`${property}: ${phoneIDs[property]}`);
    if (id === property) return phoneIDs[property];
  }
}

app.post('/greeting', (req, res) => {
  console.log('🗞️  /greeting', req.body); // {phone,id}
  if (req.body.phone && req.body.id) phoneIDs.push(req.body);
  let phone = req.body.phone;
  phoneNumber = phone.replace('+', '');
  ID = req.body.id;

  registerWA(phoneNumber, url, 'incoming', waNumber);

  startDemo(req, res);

  // var channel = 'greeting';
  // var data = { pushData: { state: 1, text: '' } };
  // pusher.trigger(channel, ID, data);
});

app.post('/inbound', (req, res) => {
  console.log('🗞️  /inbound req.body:', req.body);
  var text;
  var reply;
  let replyAddress;
  // IF ADDRESS IS INPUTED OR TEXT e.g. ANY
  if (req.body.message_type === 'text') {
    console.log('got text:', req.body.text);
    // assign text for switch case
    text = req.body.text;
    reply = req.body.text;
    // res.status(200).end();
  } else if (req.body.message_type === 'location') {
    console.log('got location', req.body.location);
    text = req.body.location;
    reply = 'location';
    // IF TEMPLATE BUTTON
  } else if (req.body.message_type === 'button') {
    console.log('got button', req.body.button.text);
    // assign text for switch case
    reply = req.body.button.text;

    // ELSE IF INTERACTIVE BUTTON OR LIST IS SELECTED
  } else if (req.body.message_type === 'reply') {
    console.log('got reply:', req.body.reply.title);
    // res.status(200).end();
    reply = req.body.reply.title; // LEAVE
    if (req.body.reply.description) {
      replyAddress = req.body.reply.description;
    }

    // ELSE IF LIST IS SELECTED && DESCRIPTION CONTAINES ADDRESS
  } else {
    console.log('💀 Unrecognised Incoming message_type');
  }

  // IF VALID ADDRESS IS ENTERED with Format E.g: 123 Main St Boston, MA 01850
  if (req.body.message_type === 'location') {
    console.log('✅ User shared location', req.body.location);
    getCoordinate(req, res);
    pusher.trigger('inbound', ID, {
      pushData: {
        state: 6,
        location: req.body.location,
      },
    });
    res.status(200).end();

    // ELSE IF IS A REPLY AND ADDRESS SELECTED FROM LIST HAS ZIPCODE
  } else if (reply && /(\d{5})/.test(replyAddress)) {
    console.log('✅ Reply Address Selected - req.body', req.body);
    getOneCoordinate(req, res, replyAddress);
    pusher.trigger('inbound', ID, {
      pushData: {
        state: 7,
        text: req.body.reply.title,
      },
    });
    res.status(200).end();

    // HANDLES ALL REPLIES (SELECTIONS OF BUTTONS AND LIST)
  } else {
    var textToSend;
    // IF A SELECTION IS MADE AND NOT VALID ADDRESS FORMAT
    if (reply || !req.body.message_type === location) {
      switch (reply) {
        case 'ANY':
          console.log('switch case:', reply);
          textToSend =
            "Hello, I'm the Virtual Shopping Assistant. Would you like to hear about our new items? If not, select LEAVE, otherwise select STAY";
          sendGreeting(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 1,
              text: reply,
            },
          });
          break;
        case 'Start the Demo':
          console.log('switch case:', reply);
          textToSend =
            "Hello, I'm the Virtual Shopping Assistant. Would you like to hear about our new items? If not, select LEAVE, otherwise select STAY";
          sendGreeting(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 1,
              text: reply,
            },
          });
          break;
        case 'LEAVE':
          console.log('got here .');
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 0,
              text: req.body.reply.title,
            },
          });
          break;
        case 'STAY':
          textToSend =
            'Fabulous. Let’s start with shirt colors. Are you looking for a LIGHT or DARK color shirt';
          lightOrDark(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 2,
              text: req.body.reply.title,
            },
          });
          break;
        case 'LIGHT':
          textToSend = 'light';
          sendListShade(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 3,
              text: req.body.reply.title,
            },
          });
          break;
        case 'DARK':
          textToSend = 'dark';
          sendListShade(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 3,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Red':
          textToSend = 'Red';
          sendBtnImage(req, res, textToSend, baseURL);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 4,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Blue':
          textToSend = 'Blue';
          sendBtnImage(req, res, textToSend, baseURL);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 4,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Green':
          textToSend = 'Green';
          sendBtnImage(req, res, textToSend, baseURL);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 4,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Nothing':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 0,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Yes':
          textToSend = 'Great, Please share your mobile WhatsApp Location';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 5,
              text: req.body.reply.title,
            },
          });
          break;
        case 'No':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 0,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Visit Website':
          textToSend = 'Please visit Vonage-Shopping.com';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 0,
              text: req.body.reply.title,
            },
          });
          break;
        default:
          textToSend = 'Sorry, your input was invalid. Please try again.';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', ID, {
            pushData: {
              state: 5,
              text: 'Sorry, your input was invalid. Please try again',
            },
          });
          break;
      }
    }
  }
});

app.post('/status', (req, res) => {
  console.log('Message', req.body.status);

  res.status(200).end();
});

app.post('/event', (req, res) => {
  console.log('event', req.body);
  res.status(200).end();
});

app.get('/delivery-receipt', (req, res) => {
  // console.log('event', req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`🌏 Server running at http://localhost:${port}`);
});
