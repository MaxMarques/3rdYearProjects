const express = require('express');
const router = express.Router();

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'area.yepnancy@gmail.com',
        pass: 'Groupe@Nancy@',
    },
    secure: true,
});

router.post('/send-mail', (req, res) => {
    const {mail, subjectOfMail, message} = req.body;
    const mailData = {
        from: 'area.yepnancy@gmail.com',  // sender address
        to: mail,   // list of receivers
        subject: subjectOfMail,
        html: message,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({message: "Mail send", message_id: info.messageId});
    });
});

module.exports = router;