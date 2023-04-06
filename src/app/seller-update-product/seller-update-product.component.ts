import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{

  productData : undefined | product;
  productMessage: undefined | string;
  constructor(private route : ActivatedRoute, private product : ProductsService, private router : Router) {}

  ngOnInit(): void 
  {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    });
  }
  submit(data:product){
    console.warn(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = 'product has updated.'
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 2000);
  }
}

