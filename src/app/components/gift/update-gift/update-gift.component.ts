import { Component, Input, SimpleChanges, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftService } from '../../../../service/gift.service';
import { DonorService } from '../../../../service/donor.service';
import { Gift } from '../../../../domain/gift';
import { Donor } from '../../../../domain/donor';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-gift',
  templateUrl: './update-gift.component.html',
  styleUrl: './update-gift.component.scss',
  providers: [MessageService, ConfirmationService]

})
export class UpdateGiftComponent {
  frmEditGift!: FormGroup
  srvGift: GiftService = inject(GiftService)
  srvDonor: DonorService = inject(DonorService)
  giftDialogEdit = output<boolean>();
  messegeServiceAdd = output<{}>();
  gifts!: Gift[];
  giftsToManage = output<Gift[]>();
  donors!: Donor[];
  donors2!: any[];
  gift!: Gift
  @Input()
  giftFromManage!:Gift
 
  constructor(
    // private messageService: MessageService,
    private confirmationService: ConfirmationService) {
      
    this.frmEditGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("")
      // name: new FormControl(this.giftFromManage.name, [Validators.required]),
      // donor: new FormControl(this.giftFromManage.donor, [Validators.required]),
      // price: new FormControl(this.giftFromManage.price, [Validators.required]),
      // image: new FormControl(this.giftFromManage.image, [Validators.required])
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.giftFromManage) {
      this.gift = this.giftFromManage;
      this.frmEditGift = new FormGroup({
        name: new FormControl(this.gift.name, [Validators.required]),
        donor: new FormControl(this.gift.donor, [Validators.required]),
        price: new FormControl(this.gift.price, [Validators.required]),
        image: new FormControl(this.gift.image),
      });
    }
    if (changes['donors'] && this.frmEditGift) {
      this.frmEditGift.get('donor')?.updateValueAndValidity();
    }
  }
  onDonorChange(event:any) {
    // עדכון אם יש שינוי
    console.log('Donor changed', event);
    this.frmEditGift.controls['donor'].setValue(event.value);
  }
  loadDonors(newDonors: Donor[]) {
    this.donors = newDonors;
    this.frmEditGift.get('donor')?.updateValueAndValidity();
  }
  ngOnInit() {
    console.log(this.gift);
    
    this.loadDonors(this.donors);
    this.srvGift.getGifts().subscribe((data) => {
      this.gifts = data
      this.srvDonor.getDonors().subscribe((data) => {
      this.donors = data
      this.donors2 = this.donors.map((d) => {
        return d.fullName
      })
    })
    })
  }
  hideDialog() {
    this.giftDialogEdit.emit(false)
    // this.submitted = false;
  }
  saveGift() {
    console.log(this.gift);
    if(this.gift.usersList?.length == 0){
      this.gift = {
        id: this.gift.id,
        name: this.frmEditGift.controls['name'].value,
        donor: this.frmEditGift.controls['donor'].value,
        price: this.frmEditGift.controls['price'].value,
        image: this.frmEditGift.controls['image'].value,
        usersList:[],
        //ערכים פיקטיביים....
        winner: {
          id:1,
          phone:"0",
          adress:"b",
          creditCard:"h",
          role:"User",
          email:"2@2.2",
          fullName:"hjgh",
          password:"6789"
        }
      }
      if (this.gift.id) {
        let ind = this.gifts.findIndex(g => g.name == this.gift.name)
        if (ind == -1 || ind > -1 && this.gifts[ind].id == this.gift.id) {
          this.srvGift.update(this.gift.id, this.gift).subscribe((data) => {
            this.gift=data
            this.srvGift.getGifts().subscribe((data) => { 
              this.gifts = data 
              this.giftsToManage.emit(this.gifts)
            })
            this.messegeServiceAdd.emit({
            severity: 'success',
            summary: 'Successful',
            detail: 'Gift Updated',
            life: 3000,
          })
          })
         
          
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Successful',
          //   detail: 'Gift Updated',
          //   life: 3000,
          // });
        }
        else {
          this.messegeServiceAdd.emit({
            severity: 'error',
            summary: 'Error',
            detail: 'This name already exists',
            life: 3000,
          })
          // this.messageService.add({
          //   severity: 'danger',
          //   summary: 'Error',
          //   detail: 'This name already exists',
          //   life: 3000,
          // });
        }
      this.giftDialogEdit.emit(false)
      }
    }
    else {
      this.giftDialogEdit.emit(false)
      this.messegeServiceAdd.emit({
        severity: 'error',
        summary: 'Can not Update',
        detail: 'Someone already bought this gift.',
        life: 3000,
      })
    }
  }

}
