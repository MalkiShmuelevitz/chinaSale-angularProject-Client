import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService{
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoterryActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visibleLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userConnect: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {
    // localStorage.setItem('IsAdmin',"false") 
    // this.setIsAdmin(JSON.parse(localStorage.getItem('IsAdmin') || ""))
  }

  getIsAdmin(){
    // this.isAdmin = JSON.parse(localStorage.getItem('IsAdmin') || "")
    this.setIsAdmin(JSON.parse(localStorage.getItem('IsAdmin') || "false"))
    // this.isAdmin = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('IsAdmin') || ""))
    return this.isAdmin
  }

  setIsAdmin(b:boolean){
    localStorage.setItem('IsAdmin',JSON.stringify(b))
    this.isAdmin.next(b)
  }

  getIsLoterryActive(){
    this.setIsLoterryActive(JSON.parse(localStorage.getItem('IsLoterryActive') || "false"))
    return this.isLoterryActive
  }
  setIsLoterryActive(b:boolean){
    localStorage.setItem('IsLoterryActive',JSON.stringify(b))
    this.isLoterryActive.next(b)
  }
  getUserConnect(){
    // this.setUserConnect(JSON.parse(localStorage.getItem('UserConnect') || ""))
    return this.userConnect
  }
  setUserConnect(b:string){
    // localStorage.setItem('UserConnect',JSON.stringify(b))
    this.userConnect.next(b)
  }
  getVisibleLogin(){
    this.setVisibleLogin(JSON.parse(localStorage.getItem('VisibleLogin') || ''))
    return this.visibleLogin
  }
  setVisibleLogin(b:boolean){
    localStorage.setItem('VisibleLogin',JSON.stringify(b))
    this.visibleLogin.next(b)
  }
}
