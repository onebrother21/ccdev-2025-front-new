import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.models';
import { ProductsService } from '../products.service';
import { Subscription, tap, withLatestFrom } from 'rxjs';
import { AppWindowService } from 'core';
import Stepper from 'bs-stepper';

type TimelineItem = {
  badgeColor:|"danger"|"success"|"info"|"warning"
  badgeIcon:string
  text:string
  title?:string
  timeText?:string
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent implements OnInit,OnDestroy {
  ngOnDestroy(){this.subs$.forEach(s => s.unsubscribe());}
  private subs$:Subscription[] = [];
  productId!: string;
  product?: Product;
  constructor(
    private route: ActivatedRoute,
    private productsSvc: ProductsService,
    private win:AppWindowService,
  ){}
  ngOnInit(): void {
    this.subs$.push(
      this.route.params.pipe(
        withLatestFrom(this.productsSvc.products$),
        tap(([params,products]) => {
          this.productId = params['productId'];
          this.product = products.find((p) => p.id === this.productId);
      })).subscribe()
    );
  }
  items:TimelineItem[] = [
    {
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Product received',
      timeText:"9:05 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Some Title",
      text:'Courier dispatched',
      timeText:"9:08 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to procure product",
      timeText:"9:10 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to procure product",
      timeText:"9:18 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Product procured",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier en route to deliver product",
      timeText:"9:23 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Courier arrived to deliver product",
      timeText:"9:39 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Customer ID & age verified",
      timeText:"9:42 pm"
    },{
      badgeColor:"success",
      badgeIcon:"icon-check-2",
      //title:"Another One",
      text:"Product delivered",
      timeText:"9:42 pm"
    },
  ];
}
