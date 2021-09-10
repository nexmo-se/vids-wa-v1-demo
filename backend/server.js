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
const sendList = require('./sendList');
const {
  sendMessage,
  lightOrDark,
  sendListShade,
  sendBtnImage,
} = require('./sendMessage');

var phoneNumber = '';
const baseURL = 'https://kittphi.ngrok.io';
const url = 'https://kittphi.ngrok.io/webhooks/inbound';
const waNumber = '12019758605';

app.post('/sendWhatsapp', (req, res) => {
  // console.log('req.body', req.body); // { phone: '+15754947093' }
  let phone = req.body.phone;
  phoneNumber = phone.replace('+', '');

  registerWA(phoneNumber, url, 'incoming', waNumber);
  sendList(req, res);
});

app.post('/webhooks/inbound', (req, res) => {
  console.log('🗞️  inbound', req.body);
  let message = req.body.reply.title;

  // if message contains address format: 123 Main St Boston, MA 01850
  if (/\d+ ([^,]+), ([A-Z]{2}) (\d{5})/.test(message)) {
    // getCoordinate(req.body.from, req.body.to, message);
  } else {
    var textToSend;
    if (message) {
      switch (message) {
        case 'LEAVE':
          textToSend =
            'Sorry to see you leave. You can visit Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendMessage(req, res, textToSend); // TODO SEND WA MESSAGE
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
            'Sorry to see you leave. You can visit Shopping.com to opt into the virtual assistant again. Good Bye!';
          sendMessage(req, res, textToSend); // TODO SEND WA MESSAGE
          break;
        case 'Yes':
          textToSend =
            'Great, Please type in your address. E.g. 123 Main St Boston, MA 01850';
          sendMessage(req, res, textToSend); // TODO SEND WA MESSAGE
          break;
        default:
          textToSend = 'Sorry, you entered an invalid input. Try again.';
          sendMessage(req, res, textToSend); // TODO SEND WA MESSAGE
          break;
      }
    }
  }
  // when demo has completed removeRegWA
  // removeRegWA(phoneNumber, url, 'incoming');
  // res.status(200).end();
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
