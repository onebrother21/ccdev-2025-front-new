import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { Router } from '@angular/router';
import { Product } from '../product.models';
import { ProductsService } from '../products.service';
import { Subscription, tap } from 'rxjs';
import { AppStateService } from '@state';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit,OnDestroy {
  private subs:Subscription[] = [];
  dropdownMenu = ["Action","Another Action","Do Something Else"];
  products:Product[] = [];
  constructor(
    private productsSvc:ProductsService,
    private router:Router,
    private app:AppStateService,
  ){}
  ngOnInit(){
    this.subs.push(
      this.productsSvc.products$.pipe(tap(o => this.products = o)).subscribe(),
    );
  }
  doDropdownAction(i:number){
    switch(i){
      case 0:console.log("take action 1");break;
      case 1:console.log("take action 2");break;
      case 2:console.log("do something else");break;
      default:break;
    }
  }
  toggleProductComplete(o:Product){this.productsSvc.updateProduct(o.id,{productStatus:o.productStatus == "Delivered"?"Placed":'Delivered'});}
  loadProductTasksInAux(productId:string){
    this.productsSvc.selectProduct(productId);
    this.router.navigate([`/admin/products`,{outlets:{primary:'list',aux:`${productId}/tasks`}}]);
  }
  editProduct(productId:string){
    this.productsSvc.selectProduct(productId);
    this.router.navigate([`/admin/products/${productId}`]);
  }
  startNewProduct(){this.router.navigate([`/admin/products`,{outlets:{primary:'new',aux:''}}]);}
  ngOnDestroy(){this.subs.forEach(s => s.unsubscribe());}
}