import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { RouterModule,Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgModule} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DialogOverviewExampleDialog, InscriptionComponent } from './inscription/inscription.component';
import { ConfigAppComponent } from './config-app/config-app.component';
import { DialogOverviewExampleDialog2 } from './config-app/config-app.component';
import { ValidAccountPageComponent } from './valid-account-page/valid-account-page.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { CreateComponent } from './create/create.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { WeatherComponent } from './weather/weather.component';
import { PornComponent } from './porn/porn.component';
import { TwilioComponent } from './twilio/twilio.component';
// import { YahooComponent } from './yahoo/yahoo.component';
import { GithubComponent } from './github/github.component';
import { GmailComponent } from './gmail/gmail.component';
import { CryptoComponent } from './crypto/crypto.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    HomeComponent,
    ConfigAppComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    ValidAccountPageComponent,
    CreateComponent,
    UpgradeComponent,
    SpotifyComponent,
    WeatherComponent,
    PornComponent,
    TwilioComponent,
    // YahooComponent,
    GithubComponent,
    GmailComponent,
    CryptoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    OAuthModule.forRoot(),
    SocialLoginModule,
    MatButtonModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('32790087103-9c15fao878ito8l5vd2jbhdrs0ui37k1.apps.googleusercontent.com')
        }
      ]
    } as SocialAuthServiceConfig
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
