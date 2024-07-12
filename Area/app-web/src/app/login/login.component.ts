import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgForm } from '@angular/forms';
import { UserService } from '../user_service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { error } from '@angular/compiler/src/util';
import * as myGlobals from '../global';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, public userService:UserService, private router: Router, private socialAuthService: SocialAuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon("logo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  mailEmpty:boolean = false;
  pwdEmpty:boolean = false;
  incorrect:boolean = false;

  getUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }

  checkUser(form: NgForm) {
    const mail = form.value.mail;
    const hashedPassword = form.value.hashedPassword;
    if (mail == 0) {
      this.mailEmpty = true;
      return;
    } else if (hashedPassword == 0) {
      this.pwdEmpty = true;
      return;
    } else {
      this.http.post("http://localhost:8080/login", { mail, hashedPassword }).subscribe({
        next: () => {
          this.http.post("http://localhost:8080/check-confirm", { mail }).subscribe({
            next: () => {
              const email = mail;
              const isConnected = true;    
              localStorage.setItem('myCat', mail);
              console.log("c'est1", localStorage.getItem('myCat'));
              this.http.put('http://localhost:8080/user-connected', { email, isConnected }).subscribe()
              this.router.navigate(['home']);
            },
            error: error => {
              this.router.navigate(['ValidAccountPage', { useEmail: mail }]);
            }
          })
        },
        error: error => {
          if (error.status == 401) {
            this.incorrect = true;
            return;
          }
        }
      })
    }
  }

  getInfoFromGoogle(x: any) {
    this.userService.selectedUser._id = x.id;
    this.userService.selectedUser.mail = x.email;
    this.userService.selectedUser.hashedPassword = x.authToken;
    this.checkUserExist();
    this.router.navigate(['home']);
  }

  checkUserExist() {
      if (this.userService.users) {
        for (const user of this.userService.users) {
          if (this.userService.selectedUser.mail == user.mail) {
            return;
          }
        }
        this.userService.postUsers(this.userService.selectedUser).subscribe((res)=>{
          this.userService.selectedUser = new User()
        });
      }
  }

  loginWithGoogle(): void {
     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
       .then((x: any) => this.getInfoFromGoogle(x));
  }

  ngOnInit(): void {
    this.getUsers();
  }
}