import { Component,OnInit } from "@angular/core";
import { SharedModule } from "@shared";

@Component({
  selector: 'app-dash-menu',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dash-menu.component.html',
  styleUrl: './dash-menu.component.scss'
})
export class DashMenuComponent {
  menu = DASHMENU;
}
const DASHMENU = [
  {
    icon:'icon-bold',
    iconColor:'icon-success',
    category:'Business Plans',
    title:'150GB',
    info:' Update Now',
    infoIcon:'icon-refresh-01',
    url:"/admin/business"
  },{
    icon:'icon-single-02',
    iconColor:'icon-success',
    category:'Business Admins',
    title:'150,000',
    info:' Customer feedback',
    infoIcon:'icon-trophy',
    url:"/admin/user"
  },{
    icon:'icon-components',
    iconColor:'icon-danger',
    category:'Features',
    title:'12',//bugs length
    info:' In the last hours',
    infoIcon:'icon-watch-time',
    url:"/admin/business"
  },{
    icon:'icon-settings',
    iconColor:'icon-danger',
    category:'Bugs',
    title:'12',//bugs length
    info:' In the last hours',
    infoIcon:'icon-watch-time',
    url:"/admin/bugs"
  },{
    icon:'icon-map-big',
    iconColor:'icon-primary',
    category:'Map Simulator',
    title:'12',//bugs length
    info:' In the last hours',
    infoIcon:'icon-watch-time',
    url:"/admin/map-sim"
  },{
    icon:'icon-user-run',
    iconColor:'icon-primary',
    category:'Couriers Module',
    title:'+45K',
    info:' Last Research',
    infoIcon:'icon-sound-wave',
    url:"/admin/couriers"
  },{
    icon:'icon-tag',
    iconColor:'icon-primary',
    category:'Products Module',
    title:'+45K',
    info:' Last Research',
    infoIcon:'icon-sound-wave',
    url:"/admin/products"
  },{
    icon:'icon-cart',
    iconColor:'icon-primary',
    category:'Orders Module',
    title:'+45K',
    info:' Last Research',
    infoIcon:'icon-sound-wave',
    url:"/admin/orders"
  },
]