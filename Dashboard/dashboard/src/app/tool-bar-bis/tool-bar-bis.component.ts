import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetBarComponent } from '../widget-bar/widget-bar.component'

@Component({
  selector: 'app-tool-bar-bis',
  templateUrl: './tool-bar-bis.component.html',
  styleUrls: ['./tool-bar-bis.component.scss']
})
export class ToolBarBisComponent implements OnInit {

  @ViewChild(WidgetBarComponent) child: WidgetBarComponent;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.router.navigate(['login']);
  }

  openModale() {
    this.child.openDialog();
  }
}