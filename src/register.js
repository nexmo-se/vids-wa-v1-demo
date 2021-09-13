/**
 * VIDS WhatsApp Redirector
 *
 * param number: string - Your cell number - TO_NUMBER
 * param url: string - NGROK_URL/webhooks/inbound
 * param type: string = 'incoming'
 */
var request = require('request');

async function registerWA(phone, url, type = 'incoming', waNumber) {
  request.post(
    'https://vids.vonage.com/wa/register',
    {
      headers: {
        'content-type': 'application/json',
      },
      json: true,
      body: {
        phone: phone,
        url: url,
        type: type,
        service: 'wa',
        number: waNumber,
      },
    },
    function (error, response, body) {
      if (error) {
        console.log('💀 Error posting to WA redirector ', error);
      } else {
        console.log('\n✅ Registered #', phone);
      }
    }
  );
}

// STEP_1: Register TO_NUMBER and NGROK "Inbound" Webhook
// let phone = '15754947093';
// let url = 'https://kittphi.ngrok.io/webhooks/inbound';
// let waNumber = '12019758605';
// registerWA(phone, url, 'incoming', waNumber);

/**
 * To Remove Redirection Number and URL
 */
async function removeRegWA(number, url, type = 'incoming') {
  request.post(
    'https://vids.vonage.com/wa/remove',
    {
      headers: {
        'content-type': 'application/json',
      },
      json: true,
      body: {
        phone: number,
        url: url,
        type: type,
        service: 'wa',
      },
    },
    function (error, response, body) {
      if (error) {
        console.log('💀 Error posting to WA redirector ', error);
      } else {
        console.log('\n✅ UnRegistered #', number);
      }
    }
  );
}
// let phone = '15754947093'; // req.body.phone;
// let url = 'https://kittphi.ngrok.io/webhooks/inbound'; // prefix + server_url + '/wa_inbound?uid=' + userid;
// removeRegWA(phone, url, 'incoming');

/**
 * INSPECT REGISTERED URLS
 */
async function inspectRegisteredWA(number, url, type = 'incoming') {
  request.post(
    'https://vids.vonage.com/wa/inspect',
    {
      headers: {
        'content-type': 'application/json',
      },
      json: true,
      body: {
        phone: number,
        url: url,
        type: type,
        service: 'wa',
      },
    },
    function (error, response, body) {
      if (error) {
        console.log('Error posting to WA redirector ', error);
      }
    }
  );
}
// let phone = '15754947093'; // req.body.phone;
// let url = 'https://kittphi.ngrok.io/webhooks/inbound'; // prefix + server_url + '/wa_inbound?uid=' + userid;
// console.log(inspectRegisteredWA(phone, url, 'incoming'));

module.exports = { registerWA, removeRegWA, inspectRegisteredWA };
