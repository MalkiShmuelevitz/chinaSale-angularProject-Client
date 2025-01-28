import { Component, inject } from '@angular/core';
import { Donor } from '../../../../domain/donor'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
import { GiftService } from '../../../../service/gift.service';
import { Gift } from '../../../../domain/gift';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-donor',
  templateUrl: './manage-donor.component.html',
  styleUrl: './manage-donor.component.scss'
})
export class ManageDonorComponent {
  // srvDonor: DonorService = inject(DonorService)
  // srvGift: GiftService = inject(GiftService)
  // flag: boolean = false
  // flag2: boolean = false
  // currentDonor!:Donor
  // // donors$=this.srvDonor.getDonors()
  // donors!:Donor[]
  // ngOnInit(){
  //   this.srvDonor.getDonors().subscribe((data)=>{
  //     this.donors=data
  //     console.log(this.donors);
      
  //   })
  // }

  // openFormAddDonor() {
  //   this.flag = true
  //   // console.log(this.srvGift.getGiftsToDonor("owner1"));
    
  // }
  // openFormUpdateDonor(d:Donor) {
  //   this.flag2 = true
  //   this.currentDonor=d
  // }
  // closeAddDonor(f:boolean){
  //     this.srvDonor.getDonors().subscribe((data)=>{
  //     this.donors=data
  //   })
  //   this.flag=f
  // }
  // closeUpdateDonor(f:boolean){
  //   this.flag2=false
  //   this.srvDonor.getDonors().subscribe((data)=>{
  //     this.donors=data
  //   })
  // }
  donors!: Donor[];
  gifts!: Gift[];
  donor!:Donor
  donorDialogNew: boolean = false;
  donorDialogEdit: boolean = false;
  filterDonorsArr: Gift[]=[];
  basicFilterDonorsArr: Gift[]=[];
    constructor(private donorService: DonorService,
      private messageService:MessageService,
      private giftService:GiftService,
      private confirmationService:ConfirmationService
      ) {}

    ngOnInit() {
        this.donorService.getDonors().subscribe((data) => {
          console.log(data);  
          this.donors = data;
          this.basicFilterDonorsArr=this.donors
          this.donors.forEach((donor) => {
            this.giftService.getGifts().subscribe((data) => {
              this.gifts = data
              donor.gifts=this.gifts.filter((g)=>g.donor==donor.fullName)
            })
          });
        });
    }
    openNew() {
      this.donor = {};
      this.donorDialogNew = true;
    }
    editDonor(donor: Donor) {
      this.donor = { ...donor };
      this.donorDialogEdit = true;
    }
    messegeService(message: {}) {
      this.messageService.add(message)
    }
    filterDonors(target:any){
      this.donors = this.basicFilterDonorsArr
      this.filterDonorsArr=[]
      const filterText = target.value.trim().toLowerCase();
      this.donors.filter((g)=> g.fullName?.toLowerCase().includes(filterText)
      ).forEach((donor)=>
        this.filterDonorsArr.push(donor)
      )
      this.donors=this.filterDonorsArr
    }
    renderDonors(donorsFrom: Donor[]) {
      this.donors = donorsFrom
      this.basicFilterDonorsArr=this.donors
      this.donors.forEach((donor) => {
        this.giftService.getGifts().subscribe((data) => {
          this.gifts = data
          donor.gifts=this.gifts.filter((g)=>g.donor==donor.fullName)
        })
      });      
    }
    hideDialogNew(f: boolean) {
      this.donorDialogNew = f
    }
    hideDialogEdit(f: boolean) {
      this.donorDialogEdit = f
    }
    deleteDonor(donor:Donor){
        if(donor.gifts?.length!=0){
          this.messageService.add({
            severity: 'error',
            summary: 'Can not Delete',
            detail: 'This Donor donate a gift',
            life: 3000,
          });
        }
        else {
          this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + donor.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if(donor.id){
                this.donorService.delete(donor.id).subscribe((data) => {
                  this.donorService.getDonors().subscribe((data) => {
                    this.donors = data
                    this.basicFilterDonorsArr=this.donors
                  })
                })
                this.donor = {};
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Donor Deleted',
                  life: 3000,
                });
              }
              else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'Can not Delete',
                  detail: 'ERROR',
                  life: 3000,
                });
              }
            }
          });
        }
      
    }
}
