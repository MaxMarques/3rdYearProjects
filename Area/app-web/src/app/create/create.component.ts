import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectGithub() {
    this.router.navigate(['github']);
  }

  redirectPorn() {
    this.router.navigate(['porn']);
  }

  redirectSpotify() {
    this.router.navigate(['spotify']);
  }

  redirectGmail() {
    this.router.navigate(['gmail']);
  }

  redirectWeather() {
    this.router.navigate(['weather']);
  }

  redirectCrypto() {
    this.router.navigate(['crypto']);
  }
}
