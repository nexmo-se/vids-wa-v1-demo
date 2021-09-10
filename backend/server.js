let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let port = 5000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('public'));
// app.use('/images', express.static('images'));
const sendList = require('./sendList');
const { registerWA } = require('./register');

var phoneNumber = '';
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

  // when demo has completed removeRegWA
  removeRegWA(phoneNumber, url, 'incoming');
  res.status(200).end();
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
