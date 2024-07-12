import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  CryptoDataLtc: any;
  interval: any;
  CryptoDataBtc: any;
  CryptoDataEth: any;

  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(() => { this.getCryptoDataBtc(); }, 20000);
    this.CryptoDataBtc = {
      main : {},
      isDay: true
    };
    this.getCryptoDataBtc();
    
    this.interval = setInterval(() => { this.getCryptoDataLtc(); }, 20000);
    this.CryptoDataLtc = {
      main : {},
      isDay: true
    };
    this.getCryptoDataLtc();

    this.interval = setInterval(() => { this.getCryptoDataEth(); }, 20000);
    this.CryptoDataEth = {
      main : {},
      isDay: true
    };
    this.getCryptoDataEth();
  }

  getCryptoDataBtc(){
    let link:string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    fetch(link)
    .then(response=>response.json())
    .then(data=>{this.setCryptoDataBtc(data);})
  }
  getCryptoDataLtc(){
    let link:string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    fetch(link)
    .then(response=>response.json())
    .then(data=>{this.setCryptoDataLtc(data);})
  }
  getCryptoDataEth(){
    let link:string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    fetch(link)
    .then(response=>response.json())
    .then(data=>{this.setCryptoDataEth(data);})
  }
  setCryptoDataBtc(data: any){
    this.CryptoDataBtc = data;
    this.CryptoDataBtc.id = this.CryptoDataBtc[0].name;
    this.CryptoDataBtc.price = this.CryptoDataBtc[0].current_price;
    this.CryptoDataBtc.image = this.CryptoDataBtc[0].image;
    this.CryptoDataBtc.market_cap_rank = this.CryptoDataBtc[0].market_cap_rank;
  }
  setCryptoDataLtc(data: any){
    this.CryptoDataLtc = data;
    this.CryptoDataLtc.id = this.CryptoDataLtc[0].name;
    this.CryptoDataLtc.price = this.CryptoDataLtc[0].current_price;
    this.CryptoDataLtc.image = this.CryptoDataLtc[0].image;
    this.CryptoDataLtc.market_cap_rank = this.CryptoDataLtc[0].market_cap_rank;
  }
  setCryptoDataEth(data: any){
    this.CryptoDataEth = data;
    this.CryptoDataEth.id = this.CryptoDataEth[0].name;
    this.CryptoDataEth.price = this.CryptoDataEth[0].current_price;
    this.CryptoDataEth.image = this.CryptoDataEth[0].image;
    this.CryptoDataEth.market_cap_rank = this.CryptoDataEth[0].market_cap_rank;
  }
}
