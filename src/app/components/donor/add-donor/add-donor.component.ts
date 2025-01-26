import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { Donor } from '../../../../domain/donor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
import { Gift } from '../../../../domain/gift';
@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.scss'
})
export class AddDonorComponent {
  srvDonor: DonorService = inject(DonorService)
  donor!: Donor
  addDonorForm!: FormGroup
  // donors$ = this.srvDonor.getDonors()
  donors!:Donor[]
  flag = output<boolean>()


  donorDialogNew = output<boolean>();
  donorDialogNew1: boolean = true;
  messegeServiceAdd = output<{}>();
  donorsToManage = output<Donor[]>();

  @Input()
  donorsFromManage!: Donor[]

  ngOnInit() {
    this.addDonorForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      adress: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
    this.srvDonor.getDonors().subscribe((data)=>{
      this.donors=data
    })
    
  }
  saveDonor() {
    this.donors=this.donorsFromManage
    this.donor = {
      fullName: this.addDonorForm.controls['fullName'].value,
      adress: this.addDonorForm.controls['adress'].value,
      phone: this.addDonorForm.controls['phone'].value,
      email: this.addDonorForm.controls['email'].value,
    }
    let ind = this.donors.findIndex(d => d.fullName == this.donor.fullName)
    if (ind == -1) {
      this.srvDonor.post(this.donor).subscribe((data) => {
        this.donor=data
        this.srvDonor.getDonors().subscribe((data)=>{
          this.donors=data
          this.donorsToManage.emit(this.donors)
          this.messegeServiceAdd.emit(
            {
              severity: 'success',
              summary: 'Successful',
              detail: 'Donor Created',
              life: 3000,
            }
          )
        })
      })
    }
    else{
      this.messegeServiceAdd.emit(
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Duplicate donor',
          life: 3000,
        }
      )
    }
     this.donors=[...this.donors]
     this.donor={}
     this.addDonorForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      adress: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
    this.donorDialogNew.emit(false)
  }

  hideDialog() {
    this.addDonorForm = new FormGroup({
      fullName: new FormControl("", [Validators.required]),
      adress: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
    this.donorDialogNew.emit(false)
  }
}
