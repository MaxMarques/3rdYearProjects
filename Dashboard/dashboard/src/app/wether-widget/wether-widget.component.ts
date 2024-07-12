import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-wether-widget',
  templateUrl: './wether-widget.component.html',
  styleUrls: ['./wether-widget.component.scss']
})
export class WetherWidgetComponent implements OnInit {
  WeatherData:any
  City:string = 'Nancy';
  interval: any;
  constructor(private router: Router, private socialAuthService: SocialAuthService) { }
  logOut(): void {
    this.socialAuthService.signOut()
      .then(() => this.router.navigate(['login']));
  }

  ngOnInit(): void {
    this.interval = setInterval(() => { this.getWeatherData(); }, 20000);
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
  }

  getWeatherData(){
    let link:string = `https://api.openweathermap.org/data/2.5/weather?q=${this.City}&appid=e5983d8f6806328992f2883eb04dc140`;
    fetch(link)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    if (this.WeatherData.cod == 404) {
      this.WeatherData.isDay = 0;
      this.WeatherData.temp_celcius = 0;
      this.WeatherData.temp_min = 0;
      this.WeatherData.temp_max = 0;
      this.WeatherData.temp_feels_like = 0;
    } else {
      let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
      this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
      let currentDate = new Date();
      this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
      this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
      this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
      this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
      this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    }
  }
  PostCity(form:NgForm){
    this.City = form.value.city;
    this.getWeatherData();
  }

}
