import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute, NavigationCancel, Params, Router } from '@angular/router';
import { UserService } from '../user_service';

@Component({
  selector: 'app-valid-account-page',
  templateUrl: './valid-account-page.component.html',
  styleUrls: ['./valid-account-page.component.scss']
})

export class ValidAccountPageComponent implements OnInit {
  mail: any;

  constructor(private http: HttpClient, private router: Router, public userService: UserService, private route: ActivatedRoute) { }

  incorrect:boolean = false;
  empty:boolean = false;

  ngOnInit(): void {
    this.mail = this.route.snapshot.paramMap.get('useEmail');
  }

  CreateAccountPage(form: NgForm) {
    var pass = form.value.passConfirm;
    const email = this.mail;

    console.log(form)

    if (email == 0) {
      this.empty = true;
      return;
    }
    this.http.post('http://localhost:8080/check-code', { email, pass }).subscribe({
      next: () => {
        const isConfirm = true;
        const passConfirm = 0
        this.http.put('http://localhost:8080/', { email, isConfirm, passConfirm }).subscribe(() => {
          if (isConfirm == true) {
            const isConnected = true;
            this.http.put('http://localhost:8080/user-connected', { email, isConnected }).subscribe()
          }
          localStorage.setItem('myCat', email);
          console.log("c'est1", localStorage.getItem('myCat'));
          this.router.navigate(['home']);
          return;
        })
      },
      error: error => {
        this.incorrect = true;
      }
    })
  }
}
