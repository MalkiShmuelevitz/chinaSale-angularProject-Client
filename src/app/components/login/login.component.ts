import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../../domain/userLogin';
import { UserService } from '../../../service/user.service';
import { User } from '../../../domain/user';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalService } from '../../../service/global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {
  srvUser: UserService = inject(UserService)
  frmLogin!: FormGroup
  user!: User
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private globalService:GlobalService,
    private location: Location
  ) {  }
  ngOnInit() {
    this.globalService.getVisibleLogin().subscribe((visible)=>{
      // this.frmLogin.reset()
      this.visible=visible
    })
    this.frmLogin = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })
  }
  login() {
    //check this if!!!
    this.visible=false
    const len = localStorage.getItem("Cart")?.length || 0
    if (len > 0) {
      this.confirmationService.confirm({
        message: localStorage.getItem("username") + ' you are go to lose your order. to continue?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.srvUser.postLogin(
            this.frmLogin.value
          ).subscribe((data) => {
            this.user = data
            if (!this.user)
              alert("User not found go to register")
            else if (this.user.role) {
              let b:boolean=this.user.role=='Admin'?true:false
              this.globalService.setIsAdmin(b)
            }
            if (this.user.email) {
              localStorage.setItem("username", this.user.email)
            }
            if (this.user.fullName) {
              this.globalService.setUserConnect(this.user.fullName)
            }
            this.router.navigate(['/'])
          })
        }
      })
    }
    else {
      this.router.navigate(['/'])
    }
  }
  visible: boolean = false;

  position: 'right' = 'right';

  showDialog() {
      this.visible = true;
  }
}
