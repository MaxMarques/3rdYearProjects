import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user';
import { UserService } from '../user_service';

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
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '550px',
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
  constructor(public userService:UserService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  alreadyUse:boolean = false;
  noName:boolean = false;
  noMail:boolean = false;
  noPwd:boolean = false;

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }

  postUser(form:NgForm){
    if(form.value._id){
      this.userService.putUsers(form.value).subscribe((res)=>{
        this.getUsers()
        this.userService.selectedUser = new User()
      })
    } else {
      if (this.userService.users) {
        for (const user of this.userService.users) {
          if (form.value.mail == user.mail) {
            this.alreadyUse = true;
            return;
          }
        }
        if (form.value.name == "") {
          this.noName = true;
        }
        if (form.value.mail == "") {
          this.noMail = true;
        }
        if (form.value.pwd == "") {
          this.noPwd = true;
        }
        if (form.value.name != "" && form.value.mail != "" && form.value.pwd != "" && this.alreadyUse == false) {
          var encrypted = this.userService.encrypt('123456$#@$^@1ERF', form.value.pwd);
          form.value.pwd = encrypted
          this.userService.postUsers(form.value).subscribe((res)=>{
            this.getUsers();
            this.userService.selectedUser = new User();
          });
          this.dialogRef.close();
        }
      }
    }
  }

  editUser(user:User){
    this.userService.selectedUser = user;
  }
  deleteUser(_id:string){
    this.userService.deleteUser(_id).subscribe((res)=>{
      this.getUsers()
      this.userService.selectedUser = new User()
    })
  }
}