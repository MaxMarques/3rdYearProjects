import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-porn',
  templateUrl: './porn.component.html',
  styleUrls: ['./porn.component.scss']
})
export class PornComponent implements OnInit {
  
  data: any = {url: "https://gifsex.blog//uploads/posts/2020-06/1592175754_1-8.gif"};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUrl(){
    this.http.get('http://localhost:8080/nfsw/test', {}).subscribe((res) => {
      const url = res;
      this.data = url;
    });
  }
}