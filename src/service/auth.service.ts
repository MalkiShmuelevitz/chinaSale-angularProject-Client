import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem("userrole")){
      if (localStorage.getItem("userrole")=="Admin") {
        return true;  // אם המשתמש מחובר, נותנים לו לגשת לדף
      } else {
        return false;  // לא מאפשרים גישה לדף
      }
    }
    return false;
  }
}
