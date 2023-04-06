import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  authError: string = '';
  constructor(private seller: SellerService, private router: Router){}

  showLogin = false;
  onSignUp(data:signUp): void{
 
  this.seller.userSignUp(data)
  }

  onLoginUp(data:signUp): void
    {
      //console.warn(data);
      this.seller.userLoginUp(data);
      this.seller.isLoginError.subscribe((isError)=>{
         if(isError){
          this.authError = "Email or password is not correct";
         }
      })
    }
  

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  openLogin(){
   this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false
  }
}
