import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { LoginComponent } from '../login/login.component'
import * as myGlobals from '../global';
import { HttpClient } from '@angular/common/http';

// Map for localStorage keys
const LOCALSTORAGE_KEYS: any = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES: any = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})

export class SpotifyComponent implements OnInit {
  
  constructor(private router: ActivatedRoute, private http:HttpClient,) { }
  
  loginData: any;

  ngOnInit(): void {

  }
  logToSpotify = () => {
    this.router.queryParams.subscribe(res=>{
      this.loginData = this.router.snapshot.queryParams;
      console.log("heyyy", res) //will give query params as an object
    })
    var accessTokenSpotify = this.loginData['access_token'];
    var refreshTokenSpotify = this.loginData['refresh_token'];
    var expireTimeSpotify = this.loginData['expires_in']
    var timestampSpotify = Date.now().toString();
    const email = localStorage.getItem('myCat');
    
    this.http.get('http://localhost:8080/get-user-connected').subscribe((response) => {
      const email = Object.values(response)[1];
      console.log(email)
      this.http.put('http://localhost:8080/get-spotify-log', {email, accessTokenSpotify, refreshTokenSpotify, expireTimeSpotify, timestampSpotify}).subscribe(() => {
         })
    })
    }

  getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
  
    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || this.hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
      this.refreshToken();
    }
  
    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
      return LOCALSTORAGE_VALUES.accessToken;
    }
  
    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      // Store the query params in localStorage
      for (const property in queryParams) {
        window.localStorage.setItem(property, queryParams[property] || '{}');
      }
      // Set timestamp
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
      // Return access token from query params
      return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
    // We should never get here!
    return false;
  };
  
  hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
  };
  
  refreshToken = async () => {
    axios.defaults.baseURL = 'https://api.spotify.com/v1';
    axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    try {
      // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
      if (!LOCALSTORAGE_VALUES.refreshToken ||
        LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
        (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
      ) {
        console.error('No refresh token available');
        this.logout();
      }
  
      // Use `/refresh_token` endpoint from our Node app
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
  
      // Update localStorage values
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
  
      // Reload the page for localStorage updates to be reflected
      window.location.reload();
  
    } catch (e) {
      console.error(e);
    }
  };

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

getCurrentUserProfile = () => {
  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`;
  const test = axios.get('/me');
  this.http.get('http://localhost:8080/twilio/sendSMSspot').subscribe((response) => {});
}

getFeaturedPlaylist = () => {
  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`;
  const test = axios.get('/browse/featured-playlists', { params: { timestamp: "2021-12-06T23:11:36.285Z", locale: "fr_FR", offset: 1,  limit: 10, country: "FR" }});
  console.log(test);
  this.http.get('http://localhost:8080/twilio/sendSMSspot').subscribe((response) => {});
}

getCurrentUserPlaylist = () => {
  axios.defaults.baseURL = 'https://api.spotify.com/v1';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`;
  const test = axios.get('/me/playlists', { params: { timestamp: "2021-12-06T23:11:36.285Z", locale: "fr_FR", offset: 1,  limit: 10, country: "FR" }});
  console.log(test);
  this.http.get('http://localhost:8080/twilio/sendSMSspot').subscribe((response) => {});
}

getUserPlaylists = () => {
  this.http.get('http://localhost:8080/spotify/playlists', {}).subscribe(() => {
      })
}

  logout = () => {
    // Clear all localStorage items
     for (const property in LOCALSTORAGE_KEYS) {
       window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
     }
     // Navigate to homepage
     window.location.replace(window.location.origin);

  }
  
   sToken = this.getAccessToken();
}

