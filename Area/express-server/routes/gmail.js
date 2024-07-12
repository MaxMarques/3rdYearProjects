const { google } = require('googleapis');

const express = require('express');
const router = express.Router();

const CLIENT_ID = '793072591470-smm40109mtbp9itsjrir76to8nvehi4m.apps.googleusercontent.com';
const CLIENT_ID_MOB = '793072591470-hnuudg52lsqildkm3lu5rl9ldh9m206i.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://localhost:8081/home';
const REFRESH_TOKEN = '1//04tiGni6AeWjtCgYIARAAGAQSNwF-L9Ir-J-Ek6bKJnogo0G9hoPCI99OLWwODcPxppaOhqGuF4SpPn3egvtDxKY3LTSajWQF32I';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
];

oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

router.get('/gmail-connect', function (req, res) {
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.status(200).send({ msg: "Connect", link: url });
});

router.get('/redirectUrlGmail', async function (req, res) {
    console.log(req.body)
    console.log(req.query.code)
    const { tokens } = await oauth2Client.getToken(req.query.code)
    console.log(tokens)
    res.json({ "token": tokens.access_token })
});

module.exports = router;

