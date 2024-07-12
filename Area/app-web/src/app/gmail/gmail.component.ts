import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.scss']
})
export class GmailComponent implements OnInit {

  url: any;
  constructor(private http:HttpClient, ) { }

  ngOnInit(): void {
  }

  connectedGmail() {
    this.http.get('http://localhost:8080/gmail/gmail-connect').subscribe((res) => {
      this.url = Object.values(res)[1];
    })
  }
}
