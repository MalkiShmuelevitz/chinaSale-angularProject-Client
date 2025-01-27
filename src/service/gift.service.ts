import { Injectable, inject } from '@angular/core';
import { Gift } from '../domain/gift';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftForCart } from '../domain/giftForCart';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  http:HttpClient=inject(HttpClient)
  BASE_URL = "https://localhost:44340/api/Gifts"
  constructor() {
    // this.getGiftsFromServer()
    // console.log(this.getGiftsFromServer().subscribe((data)=>{this.gifts= data}));
    // console.log(this.gifts);
    
   }
  gifts: Gift[] = [
    // { id: 1234, name: 'half-kupa', donor: 'owner1', price: 50 },
    // { id: 2345, name: 'half-kupa1', donor: 'owner1', price: 10 },
    // { id: 3456, name: 'half-kupa2', donor: 'owner1', price: 60 },
    // { id: 4567, name: 'half-kupa3', donor: 'owner1', price: 50 }
  ]
  // getGifts() {
  //   return this.gifts
  // }
  // getById(id: number) {
  //   return this.gifts.find(i => i.id = id)
  // }
  // add(gift: Gift) {
  //   this.gifts.push(gift)
  // }
  // update(id: number, gift: Gift) {
  //   let ind = this.gifts.findIndex(i => i.id == id)
  //   this.gifts[ind]=gift
  // }
  // delete(id: number) {
  //   this.gifts = this.gifts.filter((v) => v.id !== id);
  // }
  // length(){
  //   return this.gifts.length
  // }
  getGiftsToDonor(nameDonor:any):Gift[]{
    return this.gifts.filter(g=>g.donor==nameDonor)
  }
  getGifts():Observable<Gift[]>{
    return this.http.get<Gift[]>(this.BASE_URL)
  }
  getWithRandom():Observable<Gift[]>{
    return this.http.get<Gift[]>(this.BASE_URL+"/random")
  }
  getById(id:number):Observable<Gift>{
    return this.http.get<Gift>(this.BASE_URL + "/" + id)
  }
  post(gift:Gift):Observable<Gift>{
    return this.http.post<Gift>(this.BASE_URL,gift)
  }
  postForCart(gifts:GiftForCart[],username:string):Observable<Gift[]>{
    // console.log(username);
    // console.log(gifts);
    const headers = {
      'Content-Type': 'application/json'
    }
    // console.log(this.BASE_URL+"/"+username,gifts,{headers});
    return this.http.post<Gift[]>(this.BASE_URL+"/"+"users"+"?username="+username,gifts,{headers})
  }
  update(id:number,gift:Gift):Observable<Gift>{
    return this.http.put<Gift>(this.BASE_URL+"/"+id,gift)
  }
  delete(id:number | undefined):Observable<Gift>{
    return this.http.delete<Gift>(this.BASE_URL + "/" + id)
  }
}