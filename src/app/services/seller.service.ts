import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { loginUp, signUp} from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isUserLoggedIn =  new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  isLoginError = new EventEmitter<boolean>(false);
  userSignUp(data:signUp)
  {
     this.http.post('http://localhost:3000/seller',data,
      {observe: 'response'})
      .subscribe((result) =>{
        this.isUserLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        
      });
  
  }

 userLoginUp(data: loginUp)
 {
    console.warn("data: ",data);
    //API call code here
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe: 'response'}
    ).subscribe((result: any)=>{
      console.warn(result);
      if(result && result.body && result.body.length)
      {
        console.warn("User logged in");
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
      else
      {
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    })
 }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

}


