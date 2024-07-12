import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomePageComponent } from './home-page/home-page.component'
import { SpotifyComponent } from './spotify/spotify.component';
import { CryptoComponent } from './crypto/crypto.component';
import { WetherWidgetComponent } from './wether-widget/wether-widget.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'spotify', component: SpotifyComponent},
  {path: 'crypto', component: CryptoComponent},
  {path: 'weather', component: WetherWidgetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
