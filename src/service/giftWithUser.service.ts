import { Injectable, inject } from '@angular/core';
import { Gift } from '../domain/gift';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftWithUser } from '../domain/giftWithUser';
import { GiftForCart } from '../domain/giftForCart';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class GiftWithUserService {
  http:HttpClient=inject(HttpClient)
  BASE_URL = "https://localhost:44340/api/GiftsWithUsers"
  
  constructor() {
   }
  gifts: Gift[] = [
  
  ]

 
  getGifts():Observable<GiftWithUser[]>{
    return this.http.get<GiftWithUser[]>(this.BASE_URL)
  }
  getWithRandom():Observable<GiftWithUser[]>{
    return this.http.get<GiftWithUser[]>(this.BASE_URL+"/random")
  }
  post(gifts:GiftForCart[],username:string):Observable<GiftWithUser[]>{
    console.log(username);
    console.log(gifts);
    const headers = {
      'Content-Type': 'application/json'
    }
    console.log(this.BASE_URL+"/"+username,gifts,{headers});
    return this.http.post<GiftWithUser[]>(this.BASE_URL+"?username="+username,gifts,{headers})
  }
  
}