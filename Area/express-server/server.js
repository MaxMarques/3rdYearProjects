const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const spotify = require('./routes/spotify');

const nodemail = require('./routes/nodemail');

const gmail = require('./routes/gmail');

const nfsw = require('./routes/nfsw');

const github = require('./routes/github');

const twilio = require('./routes/twilio');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next()
  })

app.use('/', api);
app.use('/nodemail', nodemail);
app.use('/spotify', spotify);
app.use('/gmail', gmail);
app.use('/nfsw', nfsw);
app.use('/github', github);
app.use('/twilio', twilio)

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
