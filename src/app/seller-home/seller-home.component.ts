import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit
{
  productList : undefined | product[]
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
   constructor(private product: ProductsService){}

  ngOnInit(): void {
   this.list();
  }

   deleteProduct(id:number){
    console.warn("test id",id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = 'Product is deleted';
        this.list();
      }
      
      setTimeout(() => {
        this.productMessage = undefined;
      }, 2000);
    })
   }

   list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList = result;
    })
   }
}
