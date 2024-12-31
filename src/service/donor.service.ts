import { Injectable, inject } from '@angular/core';
import { Donor } from '../domain/donor';
import { GiftService } from './gift.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  http:HttpClient = inject(HttpClient)
  BASE_URL = "https://localhost:44340/api/Donors"
  constructor() { }
  // donors: Donor[] = [
  // //  {id:1,fullName: "owner1",adress:"aaa",phone:"0000",email:"1@1.1"},
  // //  {id:2,fullName: "222",adress:"bbb",phone:"1111",email:"1@1.1"},
  // //  {id:3,fullName: "333",adress:"ccc",phone:"2222",email:"1@1.1"},
  // //  {id:4,fullName: "444",adress:"ddd",phone:"3333",email:"1@1.1"},
  // ]
  // getAll(){
  //   return this.donors
  // }
  // add(donor:Donor){
  //   this.donors.push(donor)
  // }
  // update(donor:Donor){
  // let i= this.donors.findIndex(d=>d.id==donor.id )
  // this.donors[i]=donor
  // }
  getDonors():Observable<Donor[]>{
    return this.http.get<Donor[]>(this.BASE_URL)
  }
  getById(id:number):Observable<Donor>{
    return this.http.get<Donor>(this.BASE_URL+'/'+id)
  }
  post(donor:Donor):Observable<Donor>{
    return this.http.post<Donor>(this.BASE_URL,donor)
  }
  put(donor:Donor):Observable<Donor>{
    return this.http.put<Donor>(this.BASE_URL+'/'+donor.id,donor)
  }
  delete(id:number):Observable<Donor>{
    return this.http.delete<Donor>(this.BASE_URL+'/'+id)
  }

}
