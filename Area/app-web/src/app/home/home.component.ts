import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../user_service';
import { User } from '../user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpClient, public userService:UserService, private router: Router,) { 
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }

  redirectCreate(){
    this.router.navigate(['create']);
  }

  redirectUpgrade(){
    this.router.navigate(['upgrade']);
  }

  postUser(form:NgForm){
    const mail = form.value.mail;
    const object = form.value.object;
    const string = form.value.string;
    this.http.post('http://localhost:8080/nodemail/send-gmail', {mail, object, string}).subscribe(() => {
    })
  }
}