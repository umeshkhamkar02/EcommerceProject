import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  menuType : string = '';
  sellerName : string = '';
  searchResult : undefined | product[];
constructor(private router: Router, private product: ProductsService  ){}

  ngOnInit(): void 
  {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller'))
        {
          this.menuType = "seller";
          if(localStorage.getItem('seller'))
          {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else{
          console.log("outside seller")
          this.menuType = "default";
        }
      }
  })
  }
  
  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProducts(query:KeyboardEvent){
    if(query){
      const element= query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        console.warn(result);
        if (result.length >5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }
}
