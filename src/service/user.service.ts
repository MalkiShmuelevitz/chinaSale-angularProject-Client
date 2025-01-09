import { Injectable, inject } from '@angular/core';
import { Gift } from '../domain/gift';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user';
import { UserLogin } from '../domain/userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http:HttpClient=inject(HttpClient)
  BASE_URL = "https://localhost:44340/api/Users"
  constructor() {
    // this.getGiftsFromServer()
    // console.log(this.getGiftsFromServer().subscribe((data)=>{this.gifts= data}));
    // console.log(this.gifts);
    
   }
  users: User[] = [
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
  // getGiftsToDonor(nameDonor:any):Gift[]{
  //   return this.gifts.filter(g=>g.donor==nameDonor)
  // }
  // getGifts():Observable<Gift[]>{
  //   return this.http.get<Gift[]>(this.BASE_URL)
  // }
  // getById(id:number):Observable<Gift>{
  //   return this.http.get<Gift>(this.BASE_URL + "/" + id)
  // }
  postLogin(user:UserLogin):Observable<User>{
   return this.http.post<User>(this.BASE_URL+"/"+"login",user)
  }
  post(user:User):Observable<User>{
    return this.http.post<User>(this.BASE_URL,user)
  }
 
  // update(id:number,gift:Gift):Observable<Gift>{
  //   return this.http.put<Gift>(this.BASE_URL+"/"+id,gift)
  // }
  // delete(id:number | undefined):Observable<Gift>{
  //   return this.http.delete<Gift>(this.BASE_URL + "/" + id)
  // }
}