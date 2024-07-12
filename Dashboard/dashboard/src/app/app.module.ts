import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule,Routes } from '@angular/router';
import { InscriptionComponent, DialogOverviewExampleDialog } from './inscription/inscription.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { MatIconModule } from '@angular/material/icon';
import { WetherWidgetComponent } from './wether-widget/wether-widget.component';
import { HomePageComponent } from './home-page/home-page.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ToolBarBisComponent } from './tool-bar-bis/tool-bar-bis.component';
import { WidgetBarComponent } from './widget-bar/widget-bar.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { ApiInterceptor } from './apiInterceptor';
import { ApiModule } from './api/api.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiService } from './api/services';
import { CryptoComponent } from './crypto/crypto.component';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    DialogOverviewExampleDialog,
    LoginComponent,
    WetherWidgetComponent,
    HomePageComponent,
    ToolBarComponent,
    ToolBarBisComponent,
    WidgetBarComponent,
    SpotifyComponent,
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
    SocialLoginModule,
    MatIconModule,
    MatToolbarModule,
    OAuthModule.forRoot(),
    ApiModule.forRoot({ rootUrl: 'https://api.spotify.com/v1' }),
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('338958878584-cg0qs1ha5rbbs1onh7lfpl7paupbtgmd.apps.googleusercontent.com')
        }
      ]
    } as SocialAuthServiceConfig
  },
  ApiService,
  ApiInterceptor,
  API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }