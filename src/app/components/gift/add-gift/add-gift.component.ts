import { Component, Input, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gift } from '../../../../domain/gift';
import { GiftService } from '../../../../service/gift.service';
import { DonorService } from '../../../../service/donor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../../../domain/donor';
import { FileUploadEvent } from 'primeng/fileupload';
import { UserService } from '../../../../service/user.service';
// import { UplodeService } from '../../../../service/uplode.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.frmAddGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("")
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
      image: this.frmAddGift.controls['image'].value,
      usersList: [],
      winner: {
        id: 1,
        phone: "0",
        adress: "b",
        creditCard: "h",
        role: "User",
        email: "2@2.2",
        fullName: "hjgh",
        password: "6789"
      }
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
            // this.frmAddGift.reset()
            // this.frmAddGift = new FormGroup({
            //   name: new FormControl("", [Validators.required]),
            //   donor: new FormControl("", [Validators.required]),
            //   price: new FormControl(10, [Validators.required]),
            //   image: new FormControl("")
            // })
            this.messegeServiceAdd.emit(
              {
                severity: 'success',
                summary: 'Successful',
                detail: 'Gift Created',
                life: 3000,
              }
            )
          })
        })
        // this.gifts = this.srvGift.getGifts()

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
            severity: 'error',
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
      image: new FormControl("")
    })
    this.giftDialogNew.emit(false)

  }
  // }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.gift.image = e.target.result; // שמירת התמונה שנבחרה ב-gift.image
      };
      reader.readAsDataURL(file); // קורא את התמונה וממיר אותה ל-Base64
    }
  } 
  hideDialog() {
    this.frmAddGift = new FormGroup({
      name: new FormControl("", [Validators.required]),
      donor: new FormControl("", [Validators.required]),
      price: new FormControl(10, [Validators.required]),
      image: new FormControl("")
    })
    this.giftDialogNew.emit(false)
    // this.submitted = false;
  }

  // constructor(private messageService: MessageService) {}
  // uploadedFiles: any[] = [];

  // onUpload(event:FileUploadEvent) {
  //     for(let file of event.files) {
  //         this.uploadedFiles.push(file);
  //     }

  //     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  // }

  ////////////////////////////////////
  // uploadedFiles: any[] = [];
  // srvUplode:UplodeService=inject(UplodeService)
  // onUpload(event: any) {
  //   const formData = new FormData();
  //   for (let file of event.files) {
  //     formData.append('file', file);
  //   }
  //   this.srvUplode.post(formData)
  // }
  //////////////////////////////////////////////
  // onUpload(event: any) {
  // const formData = new FormData();
  // for (let file of event.files) {
  //   formData.append('file', file);
  // }

  // // העלאת הקובץ לשרת
  // this.http.post('/upload', formData).subscribe(
  //   (response: any) => {
  //     this.messageService.add({
  //       severity: 'info',
  //       summary: 'File Uploaded',
  //       detail: `File uploaded successfully to ${response.filePath}`
  //     });
  //     console.log('Upload response:', response);
  //   },
  //   (error) => {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Upload Failed',
  //       detail: 'There was an error uploading the file.'
  //     });
  //     console.error('Upload error:', error);
  //   }
  // );
  // }


  // onUpload(event: any) {
  //   const file = event.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   this.http.post('http://localhost:3000/upload', formData).subscribe((response) => {
  //     console.log('Upload successful!', response);
  //   });
  // }
}