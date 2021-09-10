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

app.post('/sendWhatsapp', (req, res) => {
  console.log('req.body', req.body); // { phone: '+15754947093' }
  sendList(req, res);
});

app.post('/webhooks/inbound', (req, res) => {
  console.log('🗞️  inbound', req.body);
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
