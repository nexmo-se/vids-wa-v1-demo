![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# <center>WhatsApp Interactive Messages Vids Demo</center>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

WhatsApp for Business: Interactive Messages are features that allow businesses to offer a way to streamline the interactions with the users,
increasing the response rates and the number of conversions by means of List Messages and Reply Button. This application features the 
WhatsApp interactive messages with a virtual shopping assistant and customer

> A [Live Demo](https://vids.vonage.com/#/VIDS?id=74) of this application is located inside of Vonage Vids along with other **Vonage API Reference Applications**.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


<div align='center'>
  
### ⚡️ Quick Links
  
<a href='https://vids.vonage.com/#/VIDS?id=74'>
  
<img src='https://img.shields.io/badge/LIVE DEMO 👀-red?style=for-the-badge'>
  
</a>
  
<a href='https://dashboard.nexmo.com/sign-in?redirect=%2F'>
  
<img src='https://img.shields.io/badge/VONAGE DASHBOARD-gray?style=for-the-badge'>
  
</a>
<a href='https://developers.facebook.com/docs/whatsapp/guides/interactive-messages'>
  
<img src='https://img.shields.io/badge/VONAGE MESSAGES API-green?style=for-the-badge'>
  
</a>

<a href='https://developers.facebook.com/docs/whatsapp/guides/interactive-messages'>
  
<img src='https://img.shields.io/badge/WHATSAPP INTERACTIVE MESSAGES-blue?style=for-the-badge'>
  
</a>
  
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


### <center>📖 Table of Contents</center>

<div align="center">
    <h3>
        <a href=#⚙️-setup>
        Setup
        </a>
        <span> | </span>
        <a href=#🔎-helpful-links>
        Helpful Links
        </a>
        <span> | </span>
        <a href=#📚-libraries-used>
        Libraries Used
        </a>
        <span> | </span>
        <a href=#📝-getting-help>
        Getting Help
        </a>
    </h3>

</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ⚙️ Setup 🚀

The Steps below are required for Local Development

1. <span style="color:orange">Prerequisites</span> - Must all be done for App to work.
    - Must have a **Vonage Account**
    - WhatsApp:
        - ❌ Instead of using: **Vonage Sandbox**. As of Sept 29, 2021, Sandbox does not support Messages V1.
        - ✅ Use: WhatsApp Business Account and Number.
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

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔎 Helpful Links

- [Facebook WhatsApp Messages](https://developers.facebook.com/docs/whatsapp/api/messages)
- [Vonage Confluence WhatsApp Features](https://confluence.vonage.com/display/MSG/WhatsApp+Features#WhatsAppFeatures-Buttonmessages)
- [Vonage Messages V1 API Reference](https://vonage-messages-v1.herokuapp.com/definitions/messages)
- [Live Demo](https://vids.vonage.com/#/VIDS?id=74) 👀

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
## 📚 Libraries Used

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Material UI](https://material-ui.com/getting-started/installation/)
- [ExpressJS](http://expressjs.com/en/starter/installing.html)
- [react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input)
- [pusher-js](https://www.npmjs.com/package/pusher-js)
- [puhser](https://www.npmjs.com/package/pusher)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 📝 Getting Help

- [Kitt.Phi@Vonage.com](mailto:kitt.phi@vonage.com?subject=[GitHub]%20Source%20Han%20Sans)

<!-- <p align="center">
<img src="images/VonageSpinner.gif" alt="Sample signal" width="10%" height="10%">
</p> -->