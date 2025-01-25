import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  constructor(
    private router:Router,
    private productsSvc:ProductsService
  ){}
  ngOnInit() {
    this.productsSvc.products$.pipe(
      withLatestFrom(this.productsSvc.selectedProduct$),
      tap(([products,productId]) => {
        if(products.length){
          this.router.navigate(['/admin/products',{outlets:{primary:"list",aux:`${productId||products[0].id}/tasks`}}]);
        }
    })).subscribe();
  }
}
