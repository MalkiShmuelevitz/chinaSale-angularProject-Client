import { Component, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../domain/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  srvUser:UserService=inject(UserService)
  frmRegister!:FormGroup
  user!:User
  ngOnInit(){
    this.frmRegister=new FormGroup({ 
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required),
      fullname:new FormControl("",Validators.required),
      adress:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required)
    })
  }
  register(){
    this.srvUser.post(this.frmRegister.value)
    .subscribe((data)=>{
      this.user=data
    })

  }
}
