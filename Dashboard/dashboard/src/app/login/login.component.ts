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

  empty:boolean = false;
  incorrect:boolean = false;

  getUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }

  checkUser(form:NgForm) {
    var encrypted = this.userService.encrypt('123456$#@$^@1ERF', form.value.password);
    form.value.password = encrypted;
    this.http.post('http://localhost:8080/login', {mail: form.value.email, pwd: form.value.password}, {observe: "response"}).pipe(catchError((error) => {
      if (error.status == 404)
        this.empty = true;
      if (error.status == 401)
        this.incorrect = true;
      return (throwError(error));
    }))
    .subscribe((res: any) => {
      if (res.status == 200) {
        this.router.navigate(['home']);
      }
    });
  }

  getInfoFromGoogle(x: any) {
    this.userService.selectedUser._id = x.id;
    this.userService.selectedUser.mail = x.email;
    this.userService.selectedUser.name = x.name;
    this.userService.selectedUser.pwd = x.authToken;
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
      .then((x) => this.getInfoFromGoogle(x));
  }

  ngOnInit(): void {
    this.getUsers();
  }
}