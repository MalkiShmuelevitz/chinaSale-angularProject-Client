import { Component, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../domain/user';
import { GiftWithUserService } from '../../../service/giftWithUser.service';
import { GiftForCart } from '../../../domain/giftForCart';
import { GiftWithUser } from '../../../domain/giftWithUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  srvUser:UserService=inject(UserService)
  srvGiftWithUser:GiftWithUserService=inject(GiftWithUserService)
  frmRegister!:FormGroup
  user!:User
  gifts!: GiftWithUser[];

  ngOnInit(){
    this.frmRegister=new FormGroup({ 
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required),
      fullname:new FormControl("",Validators.required),
      adress:new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      creditCard:new FormControl("",Validators.required)
    })
  }
  currentGifts:GiftForCart[]=[]
  payment(){
    this.currentGifts = JSON.parse(localStorage.getItem("Cart") || '[]')
    this.srvUser.post(
      this.frmRegister.value
    //   {
    //   email:this.frmRegister.controls['email'].value,
    //   password:this.frmRegister.controls['password'].value,
    //   fullName:this.frmRegister.controls['fullname'].value,
    //   adress:this.frmRegister.controls['adress'].value,
    //   phone:this.frmRegister.controls['phone'].value,
    //   creditCard:this.frmRegister.controls['creditCard'].value,
    //   role:"User",
    //   id:1
    // }
    )
    .subscribe((data)=>{
      this.user=data
      this.srvGiftWithUser.post(
        this.currentGifts,
        this.frmRegister.controls["email"].value)
      .subscribe((data)=>{
        this.gifts=data
        localStorage.clear()
      })
    })
  }
}
