require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const Pusher = require('pusher');

let app = express();
let port = 5000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static('images'));
const { registerWA, removeRegWA } = require('./register');
const {
  sendGreeting,
  lightOrDark,
  sendListShade,
  sendBtnImage,
  sendText,
} = require('./sendMessage');

const { getCoordinate, getOneCoordinate } = require('./coordinate');

var phoneNumber = '';
const baseURL = 'https://kittphi.ngrok.io';
const url = 'https://kittphi.ngrok.io/inbound';
const waNumber = '12019758605';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS,
});

// var pushData = [];
var phoneIDs = [];

app.post('/greeting', (req, res) => {
  console.log('req.body', req.body); // { phone: '+15754947093', id: 'a62c1a6f-e4cb-4fb1-ac39-239f5fbe8fb3' }
  if (req.body.phone && req.body.id) phoneIDs.push(req.body);
  let phone = req.body.phone;
  phoneNumber = phone.replace('+', '');

  registerWA(phoneNumber, url, 'incoming', waNumber);
  var textToSend =
    "Hello, I'm Sierra, the virtual shopping assitant. I can help you when we have new designs available. If you don't want to hear from me again, just select or type LEAVE, otherwise type STAY";
  sendGreeting(req, res, textToSend);
  // pushData.push(5);
  // name of channel
  var channel = 'greeting';
  // name of event. You can have as many event names as you want
  var event = 'add';
  // Create a JSON object with whatever you want, then send it to the channel/event
  // In the Frontend, we are listening to the channel, for the events, and will receive the data
  var data = { pushData: { state: 1, text: '' } };
  pusher.trigger(channel, event, data);
});

app.post('/inbound', (req, res) => {
  console.log('🗞️  inbound', req.body);

  var text;
  var reply;
  let replyAddress;
  // IF ADDRESS IS INPUTED
  if (req.body.message_type === 'text') {
    text = req.body.text;
    reply = req.body.text;
    // ELSE IF BUTTON OR LIST IS SELECTED
  } else if (req.body.message_type === 'reply') {
    reply = req.body.reply.title; // LEAVE
    if (req.body.reply.description) {
      replyAddress = req.body.reply.description;
    }
    // ELSE IF LIST IS SELECTED && DESCRIPTION CONTAINES ADDRESS
  } else {
    console.log('💀 Unrecognised Incoming message_type');
  }

  // IF ADDRESS IS INPUTED && contains address format E.g: 123 Main St Boston, MA 01850
  if (/\d+ ([^,]+), ([A-Z]{2}) (\d{5})/.test(text)) {
    console.log('✅ Valid address to compare');
    getCoordinate(req, res, text);
    res.status(200).end();
    // ELSE IF IS A REPLY AND ADDRESS SELECTED HAS ZIPCODE
  } else if (reply && /(\d{5})/.test(replyAddress)) {
    console.log('✅ Valid address');
    getOneCoordinate(req, res, replyAddress);
    res.status(200).end();
    // HANDLES ALL REPLIES (SELECTIONS OF BUTTONS AND LIST)
  } else {
    var textToSend;
    // IF A SELECTION IS MADE AND NOT VALID ADDRESS FORMAT
    if (reply || !/\d+ ([^,]+), ([A-Z]{2}) (\d{5})/.test(text)) {
      switch (reply) {
        case 'Hello':
          textToSend =
            "Hello, I'm the Virtual Shopping Assitant. Would you like to hear about our new items? If not, select LEAVE, otherwise select STAY";
          // sendGreeting(req, res, textToSend); // CAUSES ERROR
          res.status(200).end();
          pusher.trigger('inbound', 'add', {
            pushData: {
              state: 1,
              text: '',
            },
          });
          break;
        case 'LEAVE':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          pusher.trigger('inbound', 'add', {
            pushData: {
              state: 2,
              text: req.body.reply.title,
            },
          });
          break;
        case 'STAY':
          textToSend =
            'Fabulous. Let’s start with shirt colors. Are you looking for a LIGHT or DARK color shirt';
          lightOrDark(req, res, textToSend);
          pusher.trigger('inbound', 'add', {
            pushData: {
              state: 2,
              text: req.body.reply.title,
            },
          });
          break;
        case 'LIGHT':
          textToSend = 'light';
          sendListShade(req, res, textToSend);
          pusher.trigger('inbound', 'add', {
            pushData: {
              state: 3,
              text: req.body.reply.title,
            },
          });
          break;
        case 'DARK':
          textToSend = 'dark';
          sendListShade(req, res, textToSend);
          pusher.trigger('inbound', 'add', {
            pushData: {
              state: 3,
              text: req.body.reply.title,
            },
          });
          break;
        case 'Red':
          textToSend = 'Red';
          sendBtnImage(req, res, textToSend, baseURL);
          break;
        case 'Blue':
          textToSend = 'Blue';
          sendBtnImage(req, res, textToSend, baseURL);
          break;
        case 'Green':
          textToSend = 'Green';
          sendBtnImage(req, res, textToSend, baseURL);
          break;
        case 'Nothing':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          break;
        case 'Yes':
          textToSend =
            'Great, Please type in your address. E.g. 123 Main St Boston, MA 01850';
          sendText(req, res, textToSend);
          break;
        case 'No':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          break;
        case 'Visit Website':
          textToSend = 'Please visit Vonage-Shopping.com';
          sendText(req, res, textToSend);
          break;
        default:
          textToSend =
            'Sorry, your input was invalid. For address format E.g. 123 Main St Boston, MA 01850';
          sendText(req, res, textToSend);
          break;
      }
    }
  }
  // when demo has completed removeRegWA
  // removeRegWA(phoneNumber, url, 'incoming');
  // res.status(200).end(); // Cannot set headers after they are sent to the client (Because in sendMessage has res.send(data))
});

app.post('/webhooks/status', (req, res) => {
  console.log('Message', req.body.status);

  res.status(200).end();
});

app.post('/webhooks/event', (req, res) => {
  console.log('event', req.body);
  res.status(200).end();
});

app.get('/webhooks/delivery-receipt', (req, res) => {
  // console.log('event', req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`🌏 Server running at http://localhost:${port}`);
});
