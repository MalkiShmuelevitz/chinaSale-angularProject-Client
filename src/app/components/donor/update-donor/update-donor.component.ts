import { Component, Input, inject, output } from '@angular/core';
import { DonorService } from '../../../../service/donor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donor } from '../../../../domain/donor';
@Component({
  selector: 'app-update-donor',
  templateUrl: './update-donor.component.html',
  styleUrl: './update-donor.component.scss'
})
export class UpdateDonorComponent {
  srvDonor:DonorService=inject(DonorService)

  @Input()
  currentDonorFromManage!:Donor

  donor!:Donor
  donor2345!:Donor
  donors!:Donor[]
  donors$=this.srvDonor.getDonors()
  updateDonorForm!:FormGroup
  flag=output<boolean>()
  ngOnInit(){
    // this.srvDonor.getDonors().subscribe((data)=>{this.donors=data})
    this.donors$.subscribe((data)=>{this.donors=data})
    this.updateDonorForm=new FormGroup({
      id:new FormControl(this.currentDonorFromManage.id,[Validators.required]),
      fullName:new FormControl(this.currentDonorFromManage.fullName,[Validators.required]),
      adress:new FormControl(this.currentDonorFromManage.adress,[Validators.required]),
      phone:new FormControl(this.currentDonorFromManage.phone,[Validators.required]),
      email:new FormControl(this.currentDonorFromManage.email,[Validators.required,Validators.email])
    })
  }
  updateDonor(){
    this.donor={
      id:this.updateDonorForm.controls['id'].value,
      fullName:this.updateDonorForm.controls['fullName'].value,
      adress:this.updateDonorForm.controls['adress'].value,
      phone:this.updateDonorForm.controls['phone'].value,
      email:this.updateDonorForm.controls['email'].value
    }
    let ind=this.donors.findIndex(d=>d.fullName==this.donor.fullName)
    if(ind==-1 || this.donors[ind].id==this.donor.id){
      this.srvDonor.put(this.donor).subscribe((data)=>{})
      this.flag.emit(false)
    }
    else{
      alert("Duplicate name of Donor")
    }
  }
}
