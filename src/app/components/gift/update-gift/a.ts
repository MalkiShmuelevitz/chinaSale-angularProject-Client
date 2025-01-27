import { Component, Input, SimpleChanges, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftService } from '../../../../service/gift.service';
import { DonorService } from '../../../../service/donor.service';
import { Gift } from '../../../../domain/gift';
import { Donor } from '../../../../domain/donor';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-gift',
  templateUrl: './update-gift.component.html',
  styleUrls: ['./update-gift.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UpdateGiftComponent {
  frmEditGift!: FormGroup;  // הגדרת FormGroup עבור הטופס
  srvGift: GiftService = inject(GiftService);  // חיבור לשירות של מתנות
  srvDonor: DonorService = inject(DonorService);  // חיבור לשירות של תורמים
  giftDialogEdit = output<boolean>();  // לשדר את מצב דיאלוג העריכה
  messegeServiceAdd = output<{}>();  // לשדר הודעות הצלחה או שגיאה
  gifts!: Gift[];  // רשימה של מתנות
  giftsToManage = output<Gift[]>();  // להוציא את המתנות לניהול
  donors!: Donor[];  // רשימת תורמים
  donors2!: any[];  // רשימת שמות תורמים עבור dropdown
  gift!: Gift;  // אובייקט של מתנה
  @Input() giftFromManage!: Gift;  // מתנה שמתקבלת מההורה

  constructor(private confirmationService: ConfirmationService) {
    // אתחול ה-FormGroup עבור הערכים ההתחלתיים
    this.frmEditGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("", [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.giftFromManage) {
      this.gift = this.giftFromManage;
      // עדכון ה-FormGroup כאשר יש שינוי ב-giftFromManage
      this.frmEditGift = new FormGroup({
        name: new FormControl(this.gift.name, [Validators.required]),
        donor: new FormControl(this.gift.donor, [Validators.required]),
        price: new FormControl(this.gift.price, [Validators.required]),
        image: new FormControl(this.gift.image, [Validators.required]),
      });
    }

    // וידוא שה-FormControl 'donor' מעודכן אם יש שינוי בתורמים
    if (changes['donors'] && this.frmEditGift) {
      this.frmEditGift.get('donor')?.updateValueAndValidity();
    }
  }

  onDonorChange(event: any) {
    // עדכון הערך של donor ב-FormControl כאשר יש שינוי ב-dropdown
    // console.log('Donor changed', event);
    this.frmEditGift.controls['donor'].setValue(event.value);
  }

  loadDonors(newDonors: Donor[]) {
    this.donors = newDonors;
    // עדכון ה-validity של FormControl עבור 'donor'
    this.frmEditGift.get('donor')?.updateValueAndValidity();
  }

  ngOnInit() {
    // console.log(this.gift);
    
    // קריאה לשירות של תורמים כדי למלא את רשימת התורמים
    this.srvDonor.getDonors().subscribe((data) => {
      this.donors = data;
      // המרת התורמים לשמותיהם עבור ה-dropdown
      this.donors2 = this.donors.map((d) => {
        return d.fullName;
      });
    });

    // קריאה לשירות של מתנות כדי למלא את רשימת המתנות
    this.srvGift.getGifts().subscribe((data) => {
      this.gifts = data;
    });
  }

  hideDialog() {
    this.giftDialogEdit.emit(false);
  }

  saveGift() {
    // יצירת אובייקט של מתנה עם הערכים מהטופס
    this.gift = {
      id: this.gift.id,
      name: this.frmEditGift.controls['name'].value,
      donor: this.frmEditGift.controls['donor'].value,
      price: this.frmEditGift.controls['price'].value,
      image: this.frmEditGift.controls['image'].value
    };

    if (this.gift.id) {  // אם מדובר בעדכון מתנה
      let ind = this.gifts.findIndex(g => g.name == this.gift.name);
      if (ind == -1 || (ind > -1 && this.gifts[ind].id == this.gift.id)) {
        // עדכון המתנה באמצעות שירות המתנות
        this.srvGift.update(this.gift.id, this.gift).subscribe((data) => {
          this.gift = data;
          this.srvGift.getGifts().subscribe((data) => { 
            this.gifts = data;
            this.giftsToManage.emit(this.gifts);  // עדכון רשימת המתנות לניהול
          });
        });

        this.messegeServiceAdd.emit({
          severity: 'success',
          summary: 'Successful',
          detail: 'Gift Updated',
          life: 3000,
        });
      } else {
        this.messegeServiceAdd.emit({
          severity: 'danger',
          summary: 'Error',
          detail: 'This name already exists',
          life: 3000,
        });
      }
    }
    this.giftDialogEdit.emit(false);
  }
}
