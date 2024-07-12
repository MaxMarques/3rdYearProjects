import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user';
import { UserService } from '../user_service';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
// import { format } from 'path';
import { NavigationCancel, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent {
  animal: string | undefined;
  name: string | undefined;

  constructor(public dialog: MatDialog, private http:HttpClient,) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '500px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./inscription.component.scss']

})
export class DialogOverviewExampleDialog {
  constructor(public dialog: MatDialog, private http:HttpClient, public userService:UserService, private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  alreadyUse:boolean = false;
  noMail:boolean = false;
  noPwd:boolean = false;
  mailEmpty:boolean = false;
  incorrect:boolean = false;
  pwdDifferent:boolean = false;
  validate:boolean = false;

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }

  postUser(form:NgForm){
    const mail = form.value.mail;
    const hashedPassword = form.value.pwd;
    const pwd_confirm = form.value.pwd_confirm;
    const passConfirm = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const isConfirm = false;

    if (hashedPassword != pwd_confirm) {
      this.pwdDifferent = true;
      return;
    } else if (hashedPassword == 0 || pwd_confirm == 0) {
      this.noPwd = true;
      return;
    } else if (mail == 0) {
      this.mailEmpty = true
      return;
    } else if (mail.includes('@') == false) {
      this.incorrect = true;
      return;
    } else {
      this.http.post('http://localhost:8080/', {mail, hashedPassword, passConfirm, isConfirm}).pipe(catchError((error) => {
        if (error.status == 404) {
          this.alreadyUse = true;
        }
        return(throwError(error));
    })).subscribe((res: any) => {
        this.dialog.closeAll();
        this.router.navigate(['ValidAccountPage', {useEmail: mail}]);
    });
      var subjectOfMail = "AREA : Confirmez votre adresse mail"
      var message = 'Bonjour !<br><br>Votre code de vérification est '+passConfirm+'.<br>Saisissez ce code sur AREA YEP pour activer votre compte.<br>Nous sommes heureux que vous soyez là !<br><br>AREA YEP'
      this.http.post('http://localhost:8080/nodemail/send-mail', {mail, subjectOfMail, message}).subscribe(() => {
      })
    }}
  }