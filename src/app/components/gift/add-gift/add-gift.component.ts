import { Component, Input, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gift } from '../../../../domain/gift';
import { GiftService } from '../../../../service/gift.service';
import { DonorService } from '../../../../service/donor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../../../domain/donor';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrl: './add-gift.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AddGiftComponent {
  frmAddGift!: FormGroup
  srvGift: GiftService = inject(GiftService)
  srvDonor: DonorService = inject(DonorService)
  //submitted??????????/
  giftDialogNew = output<boolean>();
  giftDialogNew1: boolean = true;
  messegeServiceAdd = output<{}>();
  giftsToManage = output<Gift[]>();

  @Input()
  giftsFromManage!: Gift[]

  gifts!: Gift[];
  donors!: Donor[];
  donors2!: any[];
  gift!: Gift

  constructor(
    // private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.frmAddGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("", [Validators.required])
    })
  }
  ngOnInit() {
    this.srvDonor.getDonors().subscribe((data) => {
      this.donors = data
      this.donors2 = this.donors.map((d) => {
        return d.fullName
      })
    })
    this.srvGift.getGifts().subscribe((data) => {
      this.gifts = data
    })
  }

  saveGift() {
    this.gifts = this.giftsFromManage
    this.gift = {
      // id: this.gift.id,
      name: this.frmAddGift.controls['name'].value,
      donor: this.frmAddGift.controls['donor'].value,
      price: this.frmAddGift.controls['price'].value,
      image: this.frmAddGift.controls['image'].value
    }
    console.log(this.gift);

    // this.submitted = true;
    if (this.gift.name?.trim()) {
      // else {//if add
      if (this.gifts.findIndex(
        g =>
          //  g.id == this.gift.id ||
          g.name == this.gift.name) == -1) {
        this.srvGift.post(this.gift).subscribe((data) => {
          this.gift = data
          console.log(this.gift);
          this.srvGift.getGifts().subscribe((data) => {
            this.gifts = data
            this.giftsToManage.emit(this.gifts)

          })
        })
        // this.gifts = this.srvGift.getGifts()
        this.messegeServiceAdd.emit(
          {
            severity: 'success',
            summary: 'Successful',
            detail: 'Gift Created',
            life: 3000,
          }
        )
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Gift Created',
        //   life: 3000,
        // });
      }
      else {

        this.messegeServiceAdd.emit(
          {
            severity: 'danger',
            summary: 'Error',
            detail: 'duplicate gift',
            life: 3000,
          }
        )
        // this.messageService.add({
        //   severity: 'danger',
        //   summary: 'Error',
        //   detail: 'duplicate gift',
        //   life: 3000,
        // });
      }
    }
    this.gifts = [...this.gifts];
    this.gift = {};
    this.frmAddGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("", [Validators.required])
    })
    this.giftDialogNew.emit(false)
  }
  // }

  hideDialog() {
    this.giftDialogNew.emit(false)
    // this.submitted = false;
  }
}