import { Component, OnInit } from '@angular/core';
import { cart, loginUp, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  authError: string = '';
  showLogin: boolean = true;
  constructor(private user:UserService,private product:ProductsService){}
  ngOnInit(): void {
    this.user.userAuthReolad();
  }
  signUp(data:signUp){
  this.user.userSignUp(data);
  }

  login(data:loginUp){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("apple",result);
      if (result) {
        this.authError = 'Please Enter Valid Login Credintials';
      }
      else{
        setTimeout(() => {
          this.localCartToRemoteCart()
        }, 3000);
      }
    })
  }

  openLogin(){
  this.showLogin = false;
  }

  openSignUp(){
    this.showLogin = true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      

      cartDataList.forEach((product: product,index) => {
        let cartData: cart ={
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("item stored in DB");
              
            }
          })
          
        }, 500);
        if (cartDataList.length===index+1) {
          localStorage.removeItem('localCart')
        }
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
