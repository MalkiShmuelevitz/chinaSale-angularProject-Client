import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../../domain/userLogin';
import { UserService } from '../../../service/user.service';
import { User } from '../../../domain/user';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalService } from '../../../service/global.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

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
    private location: Location,
    private authService:AuthService
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
    this.visible=false
    this.authService.login(this.frmLogin)
  }
  visible: boolean = false;

  position: 'right' = 'right';

  showDialog() {
      this.visible = true;
  }
}
