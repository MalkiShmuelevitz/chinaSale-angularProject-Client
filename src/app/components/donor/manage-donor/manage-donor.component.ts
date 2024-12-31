import { Component, inject } from '@angular/core';
import { Donor } from '../../../../domain/donor'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
import { GiftService } from '../../../../service/gift.service';
import { Gift } from '../../../../domain/gift';

@Component({
  selector: 'app-manage-donor',
  templateUrl: './manage-donor.component.html',
  styleUrl: './manage-donor.component.scss'
})
export class ManageDonorComponent {
  srvDonor: DonorService = inject(DonorService)
  srvGift: GiftService = inject(GiftService)
  flag: boolean = false
  flag2: boolean = false
  currentDonor!:Donor
  // donors$=this.srvDonor.getDonors()
  donors!:Donor[]
  ngOnInit(){
    this.srvDonor.getDonors().subscribe((data)=>{
      this.donors=data
    })
  }

  openFormAddDonor() {
    this.flag = true
    // console.log(this.srvGift.getGiftsToDonor("owner1"));
    
  }
  openFormUpdateDonor(d:Donor) {
    this.flag2 = true
    this.currentDonor=d
  }
  closeAddDonor(f:boolean){
      this.srvDonor.getDonors().subscribe((data)=>{
      this.donors=data
    })
    this.flag=f
  }
  closeUpdateDonor(f:boolean){
    this.flag2=false
    this.srvDonor.getDonors().subscribe((data)=>{
      this.donors=data
    })
  }

}
