const express = require('express');
const router = express.Router();

const https = require("https");

router.get('/git', (req, res) => {
    let username = 'jeangd';
    
    let CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
    
    let options = {
        host: 'api.github.com',
        path: '/users/' + username,
        method: 'GET',
        headers: { 'user-agent':  CHROME_USER_AGENT}
    };
    let request = https.request(options, (response) => {
        let body = '';
        response.on('data', (out) => {
            body += out;
        });

        response.on('end', (out) => {
            let json = JSON.parse(body);
            res.status(200).send({json})
        });
    });

    request.on('error', (e)=>{
        console.log(e);
    });
    request.end();
});

module.exports = router;