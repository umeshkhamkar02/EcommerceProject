import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import {ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent 
{
  addProductMessage: string| undefined;
 
  @ViewChild('myForm', { static: false }) addProduct!: NgForm;

   constructor(private product: ProductsService){
    
   }

  submit(data:product){
   console.log(data);
   this.product.addProduct(data).subscribe((result)=>
   {
    console.log(result);
    if(result){
      this.addProductMessage='product is successfully added';
    }
    setTimeout(()=> this.addProductMessage=undefined,3000);
   });
  this.addProduct.resetForm();
  }
}
