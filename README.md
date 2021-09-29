# WhatsApp Interactive Messages Vids Demo
---

Early 2021 Facebook added a new feature in WhatsApp for Business: Interactive Messages.
These new features allow businesses to offer a way to streamline the interactions with the users,
increasing the response rates and the number of conversions by means of List Messages and Reply Button

> A [Live Demo](https://vids.vonage.com/#/VIDS?id=74) of this application is located inside of Vonage Vids along with other **Vonage API Reference Applications**.

---

## Steps

The Steps below are required for Local Development

1. <span style="color:orange">Prerequisites</span> - Must all be done for App to work.
    - Must have a **Vonage Account**
    - As of Sept 29, 2021 **Vonage Sandbox** does not support Messages V1, so you will need a WhatsApp Business Account and Number.
    - Once you have a WhatsApp Account and Number, you'll then need to [make a Vonage App](helpers/make-app.sh).
    - This Demo using a **Geo.Codes** to get Latitude/Longitude for input address. You'll need a [Geo.Codes Account](https://geo.codes/) to obtain an API-Key
    - The Demo uses **Pusher** to allow the backend to listen for `/inbound` webhook and pass it to the Frontend to update the UI. You'll need a [Pusher Account](https://pusher.com/)

2. <span style="color:orange">Setup Local Development</span>

    ```js
    // clone repo
    git clone https://github.com/nexmo-se/vids-wa-v1-demo/tree/monorepo
    // fetch remote branches
    git fetch
    // git branch & checkout monorepo branch
    git checkout -b monorepo

    // use a local tunnel app E.g. Ngrok
    ngrok http 5000

    // rename the provided env-example and populate with your credentials.
    mv env-example .env

    // install Frontend and Backend dependencies
    npm install
    // for local development and testing
    npm install nodemon concurrently --save-dev

    // to run both backend and frontend concurrently:
    npm run dev
    ```

---

## Helpful Links

- [Facebook WhatsApp Messages](https://developers.facebook.com/docs/whatsapp/api/messages)
- [Vonage Confluence WhatsApp Features](https://confluence.vonage.com/display/MSG/WhatsApp+Features#WhatsAppFeatures-Buttonmessages)
- [Vonage Messages V1 API Reference](https://vonage-messages-v1.herokuapp.com/definitions/messages)
- [Live Demo](https://vids.vonage.com/#/VIDS?id=74)

---
## Libraries Used

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Material UI](https://material-ui.com/getting-started/installation/)
- [ExpressJS](http://expressjs.com/en/starter/installing.html)
- [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input)
- [pusher-js](https://www.npmjs.com/package/pusher-js)
- [puhser](https://www.npmjs.com/package/pusher)

---