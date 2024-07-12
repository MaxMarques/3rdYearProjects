const accountSid = 'AC3c33cefeb0c04c00b0d030748e5ba5b6';
const authToken = '5dbba430bf91367a9cfb8acd62a6e80e';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Markes ta météorite a causé l extinction des dinosaures',
     from: '+17622139644',
     to: '+33782610030'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.log(err));