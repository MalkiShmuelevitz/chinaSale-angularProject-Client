import { Component, ViewChild, inject } from '@angular/core';
import { Gift } from '../../../../domain/gift';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftService } from '../../../../service/gift.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
import { Donor } from '../../../../domain/donor';
import { Table } from 'primeng/table';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-table-gifts-demo',
  templateUrl: './table-gifts-demo.component.html',
  styleUrl: './table-gifts-demo.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TableGiftsDemoComponent  {
  // implements AfterViewInit
  srvGift: GiftService = inject(GiftService)
  srvDonor: DonorService = inject(DonorService)
  giftDialogNew: boolean = false;
  giftDialogEdit: boolean = false;
  num: number = 0
  gifts!: Gift[];

  gift!: Gift;

  selectedGifts!: Gift[] | null;

  submitted: boolean = false;
  filterGiftsArr: Gift[]=[];
  basicFilterGiftsArr: Gift[]=[];
  statuses!: any[];
  donors!: Donor[]
  donors2!: any[]
  @ViewChild('dt') dt!: Table; 

  constructor(
    private giftService: GiftService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
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
      console.log(this.gifts);
    })

    // this.donors = this.srvDonor.getAll()
    // this.giftService.getGifts().then(d => this.gifts = d);

    // console.log(this.donors);
    // this.statuses = [
    //   { label: 'INSTOCK', value: 'instock' },
    //   { label: 'LOWSTOCK', value: 'lowstock' },
    //   { label: 'OUTOFSTOCK', value: 'outofstock' },
    // ];
  }



  // ngAfterViewInit() {
  //   if (!this.dt) {
  //     console.error('Table is not initialized');
  //   }
  // }
  // // פונקציה ליצוא לאקסל
  exportCSV(a:any) {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('Table is not initialized');
    }
  }
  

  openNew() {
    this.gift = {};
    this.submitted = false;
    this.giftDialogNew = true;
    console.log(this.gift)
  }
  messegeService(message: {}) {
    this.messageService.add(message)
  }

  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected gifts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedGifts?.forEach((gift) => {
          this.srvGift.delete(gift.id).subscribe((data) => {
            this.srvGift.getGifts().subscribe((data) => {
              this.gifts = data
            })
          })
        })

        // this.gifts = this.gifts.filter(
        //   (val) => !this.selectedGifts?.includes(val)
        // );
        this.selectedGifts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Gifts Deleted',
          life: 3000,
        });
      },
    });
  }
  rendeGifts(giftsFrom: Gift[]) {
    this.gifts = giftsFrom
  }
  editGift(gift: Gift) {
    this.gift = { ...gift };
    this.giftDialogEdit = true;
    // console.log(gift);
    // this.frmEdit = new FormGroup({
    //   name: new FormControl(gift.name, [Validators.required]),
    //   donor: new FormControl(gift.donor, [Validators.required]),
    //   price: new FormControl(gift.price, [Validators.required])
    // })
  }

  deleteGift(gift: Gift) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + gift.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.gifts = this.gifts.filter((val) => val.id !== gift.id);
        this.srvGift.delete(gift.id).subscribe((data) => {

          this.srvGift.getGifts().subscribe((data) => {
            this.gifts = data
          })
        })

        this.gift = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Gift Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialogNew(f: boolean) {
    this.giftDialogNew = f
  }
  hideDialogEdit(f: boolean) {
    this.giftDialogEdit = f
  }
  filterGifts(target:any){
    this.gifts = this.basicFilterGiftsArr
    this.filterGiftsArr=[]
    const filterText = target.value.trim().toLowerCase();
    this.gifts.filter((g)=> g.name?.toLowerCase().includes(filterText)
    ).forEach((gift)=>
      this.filterGiftsArr.push(gift)
    )
    console.log(this.filterGiftsArr);
    this.gifts=this.filterGiftsArr
  }
  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.gifts.length; i++) {
  //     if (this.gifts[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): number {
  //   let i = this.srvGift.length() - 1 || 0
  //   if(i>=0){
  //       this.num = this.gifts[i].id || 0
  //       this.num++
  //   }
  //   else
  //     this.num=1

  //   // var chars =
  //   //   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   // for (var i = 0; i < 5; i++) {
  //   //   id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   // }
  //   return this.num;
  // }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
