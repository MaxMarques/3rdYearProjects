import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  data: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getGithub(){
    this.http.get('http://localhost:8080/github/git', {}).subscribe((res) => {
      const temp = res;
      this.data = temp;
    });
  }

}
