const express = require('express');
const router = express.Router();

router.get('/sendSMS', (req, res) => {
  var accountSid = "AC3c33cefeb0c04c00b0d030748e5ba5b6"; // Your Account SID from www.twilio.com/console
  var authToken = "5dbba430bf91367a9cfb8acd62a6e80e"; // Your Auth Token from www.twilio.com/console
  var twilio = require("twilio");
  var client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: "Bonjour ! Vous venez de cliquer sur le bouton pour envoyer un Sms. Nous sommes heureux que vous soyez là ! AREA YEP",
      to: "+33782610030", // Text this number
      from: "+17622139644", // From a valid Twilio number
    })
    .then((message) => res.send(`The message with id: ${message} was sent!`));
});

router.get('/sendSMSspot', (req, res) => {
  var accountSid = "AC3c33cefeb0c04c00b0d030748e5ba5b6"; // Your Account SID from www.twilio.com/console
  var authToken = "5dbba430bf91367a9cfb8acd62a6e80e"; // Your Auth Token from www.twilio.com/console
  var twilio = require("twilio");
  var client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: "Wesh maramé va voir ton compte Spotify sur ton area",
      to: "+33782610030", // Text this number
      from: "+17622139644", // From a valid Twilio number
    })
    .then((message) => res.send(`The message with id: ${message} was sent!`));
});

module.exports = router;