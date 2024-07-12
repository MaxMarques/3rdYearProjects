import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ValidAccountPageComponent } from './valid-account-page/valid-account-page.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { CreateComponent } from './create/create.component';
import { GithubComponent } from './github/github.component';
import { PornComponent } from './porn/porn.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { GmailComponent } from './gmail/gmail.component';
import { WeatherComponent } from './weather/weather.component';
import { CryptoComponent } from './crypto/crypto.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ValidAccountPage', component: ValidAccountPageComponent},
  {path: 'create', component: CreateComponent},
  {path: 'upgrade', component: UpgradeComponent},
  {path: 'porn', component: PornComponent},
  {path: 'github', component: GithubComponent},
  {path: 'spotify', component: SpotifyComponent},
  {path: 'gmail', component: GmailComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'crypto', component: CryptoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
