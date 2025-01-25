import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-right-sidebar-widget',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbDropdownModule
  ],
  templateUrl: './right-sidebar-widget.component.html',
  styleUrl: './right-sidebar-widget.component.scss'
})
export class RightSidebarWidgetComponent implements OnInit {
  public sidebarColor: string = "red";
  constructor() {}
  changeSidebarColor(color:string){
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0];
    this.sidebarColor = color;
    if(sidebar != undefined){sidebar.setAttribute('data',color);}
    if(mainPanel != undefined){mainPanel.setAttribute('data',color);}
  }
  changeDashboardColor(color:string){
    const body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {body.classList.add(color);}
    else if(body.classList.contains('white-content')) {body.classList.remove('white-content');}
  }
  ngOnInit() {}
}
