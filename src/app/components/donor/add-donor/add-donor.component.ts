import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { Donor } from '../../../../domain/donor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrl: './add-donor.component.scss'
})
export class AddDonorComponent {
  srvDonor: DonorService = inject(DonorService)
  donor!: Donor
  addDonorForm!: FormGroup
  donors$ = this.srvDonor.getDonors()
  donors!:Donor[]
  flag = output<boolean>()
  ngOnInit() {
    this.donors$.subscribe((data)=>{this.donors=data})
    // this.srvDonor.getDonors().subscribe((data)=>{this.donors=data})
    this.addDonorForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      adress: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }
  addDonor() {
    this.donor = {
      id: this.addDonorForm.controls['id'].value,
      fullName: this.addDonorForm.controls['fullName'].value,
      adress: this.addDonorForm.controls['adress'].value,
      phone: this.addDonorForm.controls['phone'].value,
      email: this.addDonorForm.controls['email'].value,
    }
    let ind = this.donors.findIndex(d => d.id == this.donor.id || d.fullName == this.donor.fullName)
    if (ind == -1) {
      this.srvDonor.post(this.donor).subscribe((data) => {
        this.srvDonor.getDonors().subscribe((data)=>{this.donors=data})
        // this.donors$ = this.srvDonor.getDonors()
        // // this.donors$.subscribe((data)=>{this.donors=data})
      })
      this.donor = {}
      this.closeFormAddDonor()
    }
    else
      alert("duplicate donor")
  }

  closeFormAddDonor() {
    this.flag.emit(false)
    this.addDonorForm = new FormGroup({})
  }
}
