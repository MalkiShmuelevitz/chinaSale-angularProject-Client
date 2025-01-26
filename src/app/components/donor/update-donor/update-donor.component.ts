import { Component, Input, SimpleChanges, inject, output } from '@angular/core';
import { DonorService } from '../../../../service/donor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Donor } from '../../../../domain/donor';
import { Gift } from '../../../../domain/gift';
@Component({
  selector: 'app-update-donor',
  templateUrl: './update-donor.component.html',
  styleUrl: './update-donor.component.scss'
})
export class UpdateDonorComponent {
  srvDonor:DonorService=inject(DonorService)

  // @Input()
  // currentDonorFromManage!:Donor

  donor!:Donor
  donor2345!:Donor
  donors!:Donor[]
  donors$=this.srvDonor.getDonors()
  updateDonorForm!:FormGroup
  flag=output<boolean>()


  donorDialogEdit = output<boolean>();
  messegeServiceAdd = output<{}>();
  donorsToManage = output<Donor[]>();
 
  donors2!: any[];
 
  @Input()
  donorFromManage!:Donor
 
constructor(){
  this.updateDonorForm=new FormGroup({
    fullName:new FormControl("",[Validators.required]),
    adress:new FormControl("",[Validators.required]),
    phone:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.email])
  })
}

  ngOnInit(){
    this.srvDonor.getDonors().subscribe((data)=>{
      this.donors=data
    })
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.donorFromManage) {
      this.donor = this.donorFromManage;
      this.updateDonorForm = new FormGroup({
        fullName:new FormControl(this.donor.fullName,[Validators.required]),
        adress:new FormControl(this.donor.adress,[Validators.required]),
        phone:new FormControl(this.donor.phone,[Validators.required]),
        email:new FormControl(this.donor.email,[Validators.required,Validators.email])
      });
    }
  }
  hideDialog(){
    this.donorDialogEdit.emit(false)
  }
  saveDonor(){
    this.donor={
      id:this.donor.id,
      fullName:this.updateDonorForm.controls['fullName'].value,
      adress:this.updateDonorForm.controls['adress'].value,
      phone:this.updateDonorForm.controls['phone'].value,
      email:this.updateDonorForm.controls['email'].value
  }
    let ind=this.donors.findIndex(d=>d.fullName==this.donor.fullName)
    if(ind==-1 || this.donors[ind].id==this.donor.id){
      this.srvDonor.put(this.donor).subscribe((data)=>{
        this.donor = data
        this.srvDonor.getDonors().subscribe((data)=>{
          this.donors=data
          this.donorsToManage.emit(this.donors)
          this.messegeServiceAdd.emit({
            severity: 'success',
            summary: 'Successful',
            detail: 'Donor Updated',
            life: 3000,
          })
        })
       
      })
      
    }
    else {
      this.messegeServiceAdd.emit({
        severity: 'error',
        summary: 'Error',
        detail: 'This donor already exists',
        life: 3000,
      })
    }
    this.donorDialogEdit.emit(false)

  }
}
