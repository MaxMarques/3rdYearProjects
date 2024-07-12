import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetBarComponent } from '../widget-bar/widget-bar.component'

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

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