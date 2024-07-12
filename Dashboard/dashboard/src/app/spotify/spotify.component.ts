import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { CurrentUserProfile } from '../api/models';
import { ApiService } from '../api/services';

export const authConfig: AuthConfig = {
  oidc: false,
  responseType: 'token',
  clientId: '877a099bc34047a499121a6665a05431',
  redirectUri: 'http://localhost:3000/spotify',
  loginUrl: 'https://accounts.spotify.com/authorize',
  logoutUrl: ' https://accounts.spotify.com/en/logout ',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  scope: 'user-read-private user-read-email user-read-recently-played',
  requireHttps: false,
};

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {
  profile: any = [];
  isAuthenticated = false;
  interval: any;

  constructor(private oauthService: OAuthService, private spot: ApiService) {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin().then(success => {
      if (success) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }).catch(error => console.error('Error al hacer login ', error));
  }

  ngOnInit(): void {
  }
  login() { this.oauthService.initImplicitFlow(); }
  logout() { this.oauthService.logOut(); }

  getData() {
    this.spot
      .getMe()
      .subscribe(data => {
        this.profile = data;
      });
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      return null;
    }
    return claims;
  }
}
