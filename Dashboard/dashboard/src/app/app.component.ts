import { Component, Inject } from "@angular/core";
import { NgForm } from '@angular/forms'
import { UserService } from "./user_service";
import { User } from './user'
import { MatDialog } from "@angular/material/dialog";
import { DialogOverviewExampleDialog } from "./inscription/inscription.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService]
})

export class AppComponent {
  constructor(public userService:UserService){}

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
      this.userService.postUsers(form.value).subscribe((res)=>{
        this.getUsers()
        this.userService.selectedUser = new User()
      })
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
