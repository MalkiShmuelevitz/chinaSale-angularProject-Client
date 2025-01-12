import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../../domain/userLogin';
import { UserService } from '../../../service/user.service';
import { User } from '../../../domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  srvUser:UserService=inject(UserService)
  frmLogin!:FormGroup
  user!:User
  ngOnInit(){
    this.frmLogin=new FormGroup({
      username:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required)
    })
  }
  login(){
    this.srvUser.postLogin(
      this.frmLogin.value
    ).subscribe((data)=>{
      this.user=data
      if(!this.user)
         alert("user not found go to register")     
      else if(this.user.role){
        localStorage.setItem("user",this.user.role)
        
      }
    })

  }
}
