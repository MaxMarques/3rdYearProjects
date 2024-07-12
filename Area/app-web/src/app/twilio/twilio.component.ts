import { Component, OnInit } from '@angular/core';

declare var require: any

@Component({
  selector: 'app-twilio',
  templateUrl: './twilio.component.html',
  styleUrls: ['./twilio.component.scss']
})
export class TwilioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
//    sendSms() {
//      const accountSid = 'AC3c33cefeb0c04c00b0d030748e5ba5b6';
//      const authToken = '5dbba430bf91367a9cfb8acd62a6e80e';
//      const client = require('twilio')(accountSid, authToken);

// //     client.messages
// //       .create({
// //         body: 'Hello from node js',
// //         from: 'number-twilio',
// //         to: 'verified-number-twilio'
// //       })
// //       .then((message:any) => console.log(message.sid))
// //       .catch((err:any) => console.log(err));
//        }
 }
