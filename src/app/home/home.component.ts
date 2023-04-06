import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
 
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
 popularProducts: undefined | product[];
 trendyProducts: undefined | product[];
  constructor(private products: ProductsService) {}
  ngOnInit(): void {
   this.products.popularProducts().subscribe((result)=>{
    console.warn(result);
    this.popularProducts = result;
   });

   this.products.trendyProducts().subscribe((data)=>{
    this.trendyProducts = data;
   })
  }
}
