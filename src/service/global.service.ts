import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService{
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visibleLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userConnect: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {}

  getIsAdmin(){
    return this.isAdmin
  }
  setIsAdmin(b:boolean){
    this.isAdmin.next(b)
  }
  getUserConnect(){
    return this.userConnect
  }
  setUserConnect(b:string){
    this.userConnect.next(b)
  }
  getVisibleLogin(){
    return this.visibleLogin
  }
  setVisibleLogin(b:boolean){
    this.visibleLogin.next(b)
  }
}
