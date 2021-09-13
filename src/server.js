let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
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
const url = 'https://kittphi.ngrok.io/webhooks/inbound';
const waNumber = '12019758605';

app.post('/sendWhatsapp', (req, res) => {
  // console.log('req.body', req.body); // { phone: '+15754947093' }
  let phone = req.body.phone;
  phoneNumber = phone.replace('+', '');

  // registerWA(phoneNumber, url, 'incoming', waNumber);
  sendGreeting(req, res);
});

app.post('/webhooks/inbound', (req, res) => {
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
    reply = req.body.reply.title;
    if (req.body.reply.description) {
      replyAddress = req.body.reply.description;
    }
    // ELSE IF LIST IS SELECTED && DESCRIPTION CONTAINES ADDRESS
  } else {
    console.log('💀  Unrecognised Incoming message_type');
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
            'At VIDS Demo, Please enter your number and press Send to begin interactive';
          sendText(req, res, textToSend);
          break;
        case 'LEAVE':
          textToSend =
            'Sorry to see you leave. You can visit Vonage-Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendText(req, res, textToSend);
          break;
        case 'STAY':
          textToSend =
            'Fabulous. Let’s start with shirt colors. Are you looking for a light color or dark color shirt';
          lightOrDark(req, res, textToSend);
          break;
        case 'LIGHT':
          textToSend = 'light';
          sendListShade(req, res, textToSend);
          break;
        case 'DARK':
          textToSend = 'dark';
          sendListShade(req, res, textToSend);
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
