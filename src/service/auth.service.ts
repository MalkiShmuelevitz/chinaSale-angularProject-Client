import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { UserService } from './user.service';
import { User } from '../domain/user';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // console.log("auth");
    // console.log(this.globalService.getIsAdmin());
    
    return this.globalService.getIsAdmin();
  }
  login(frmLogin: FormGroup) {
    let user
    this.userService.postLogin(
      frmLogin.value
    ).subscribe((data) => {
      user = data
      if (!user)
        alert("User not found go to register")
      else if (user.role) {
        let b: boolean = user.role == 'Admin' ? true : false
        this.globalService.setIsAdmin(b)
      }
      if (user.email) {
        localStorage.setItem("username", user.email)
      }
      if (user.fullName) {
        this.globalService.setUserConnect(user.fullName)
      }
      localStorage.setItem("Cart", '[]')
      this.router.navigate(['/'])
    })
  }
  logOut(){
    // localStorage.clear()
    localStorage.setItem("Cart", '[]')
    localStorage.setItem("username", '')
    this.globalService.setIsAdmin(false)
    this.globalService.setUserConnect("")
    this.router.navigate(['/'])
  }
}
