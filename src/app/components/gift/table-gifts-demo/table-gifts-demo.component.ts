import { Component, ViewChild, inject } from '@angular/core';
import { Gift } from '../../../../domain/gift';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftService } from '../../../../service/gift.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from '../../../../service/donor.service';
import { Donor } from '../../../../domain/donor';
import { Table } from 'primeng/table';
import { AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../../service/global.service';
import * as XLSX from 'xlsx-js-style';

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
    private confirmationService: ConfirmationService,
    private globalService:GlobalService
  ) {
  }
  ngOnInit() {
    // console.log(this.gifts);
    
    this.srvDonor.getDonors().subscribe((data) => {
      this.donors = data
      this.donors2 = this.donors.map((d) => {
        return d.fullName
      })
    })
    this.srvGift.getGifts().subscribe((data) => {
      this.gifts = data
      // console.log(this.gifts);
      this.basicFilterGiftsArr=this.gifts

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
  openLoterry(){
    this.globalService.setIsLoterryActive(true)
  }

  openNew() {
    this.gift = {};
    this.submitted = false;
    this.giftDialogNew = true;
  }
  messegeService(message: {}) {
    this.messageService.add(message)
  }

  deleteSelectedGifts() {
    // let currentGifts =JSON.parse(localStorage.getItem('Cart') || '[]') 
    // let ind = currentGifts.findIndex((g:Gift)=>g.id == gift.id) 
    // if(ind > -1){
    //   currentGifts.splice(ind,1)
    //   localStorage.setItem('Cart', currentGifts)
    // }
    //check if the gift in the l.s
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
    this.basicFilterGiftsArr=this.gifts
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
    let currentGifts =JSON.parse(localStorage.getItem('Cart') || '[]') 
    let ind = currentGifts.findIndex((g:Gift)=>g.id == gift.id) 
    if(gift.usersList?.length == 0){
      if(ind > -1){
        currentGifts.splice(ind,1)
        localStorage.setItem('Cart', currentGifts)
      }
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + gift.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // this.gifts = this.gifts.filter((val) => val.id !== gift.id);
          this.srvGift.delete(gift.id).subscribe((data) => {
            this.srvGift.getGifts().subscribe((data) => {
              this.gifts = data
              this.basicFilterGiftsArr=this.gifts
            })
          })
  
          this.gift = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Gift Deleted',
            life: 3000,
          });
        }
      });
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: 'Can not Delete',
        detail: 'Someone already bought this gift.',
        life: 3000,
      });
    }

  }

  hideDialogNew(f: boolean) {
    this.giftDialogNew = f
    // console.log(this.gifts);

  }
  hideDialogEdit(f: boolean) {
    this.giftDialogEdit = f
    // console.log(this.gifts);

  }
  filterGifts(target:any){
    this.gifts = this.basicFilterGiftsArr
    this.filterGiftsArr=[]
    const filterText = target.value.trim().toLowerCase();
    this.gifts.filter((g)=> g.name?.toLowerCase().includes(filterText)
    ).forEach((gift)=>
      this.filterGiftsArr.push(gift)
    )
    // console.log(this.filterGiftsArr);
    this.gifts=this.filterGiftsArr
  }
 

  exporToExcel(){

    const dataToExport = this.gifts.map(gift => {
          return {
            'Id': gift.id,
            'Name': gift.name,
            'Price': gift.price,
            'Donor': gift.donor,
          };
        })
         const headers = [
          'Id',
            'Name',
            'Price',
            'Donor',
        ];
        const fullData = [headers, ...dataToExport.map(row => Object.values(row))];
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(fullData);
     
        ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, // מיזוג לכותרת הכללית
            { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }, // מיזוג לכותרת המשנה
        ];
     
      
        ws['!cols'] = headers.map(() => ({ wpx: 150 })); // רוחב עמודות
        ws['!rows'] = [
            { hpx: 30 }, // גובה שורת כותרת כללית
            { hpx: 25 }, // גובה שורת משנה
            { hpx: 25 }, // גובה שורת כותרות
        ];
     
      
        const headerStyle = {
            font: { bold: true },
            fill: { fgColor: { rgb: 'D3D3D3' }}, 
            border: {
              top: { style: 'thin', color: { rgb: '000000' } }, 
              left: { style: 'thin', color: { rgb: '000000' } }, 
              bottom: { style: 'thin', color: { rgb: '000000' } }, 
              right: { style: 'thin', color: { rgb: '000000' } } 
          }
        };
        const titleStyle = {
            font: { bold: true, sz: 16 }, // פונט גדול ומודגש
            alignment: { horizontal: 'right' } // יישור לשמאל
        };
        const subtitleStyle = {
            font: { italic: true, sz: 12 }, // פונט נטוי וקטן יותר
            alignment: { horizontal: 'right' } // יישור לשמאל
        };
     
        ws['A1'].s = titleStyle; // עיצוב כותרת כללית
        ws['A2'].s = subtitleStyle; // עיצוב כותרת המשנה
        headers.forEach((header, index) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 2, c: index });
            ws[cellAddress].s = headerStyle; // עיצוב כותרות העמודות
        });
        const dateColumnIndexes = [10, 11];  
        for (let R = 3; R <= dataToExport.length + 3; R++) { // מתחילים משורה 3 (לא לשכוח את השורות הריקות)
          dateColumnIndexes.forEach(dateColumnIndex => {
            const cell = ws[XLSX.utils.encode_cell({ c: dateColumnIndex, r: R })];
    
            // בודקים אם התא קיים
            if (!cell) return;
    
            // אם התא לא מכיל כבר עיצוב, יוצרים אובייקט עיצוב חדש
            if (!cell.s) cell.s = {};
    
            // אם התא מכיל תאריך, מיישמים יישור לימין
            if (cell.v && !isNaN(new Date(cell.v).getTime())) {
              cell.s.alignment = { horizontal: 'right', vertical: 'center' }; // יישור לימין
            }
          });
        }
    
      ws['!pageSetup'] = { layout: { textDirection: 'rtl' } };
        wb.Workbook = {
          Views: [{ RTL: true }],
                };
        XLSX.utils.book_append_sheet(wb, ws, 'gifts');
        XLSX.writeFile(wb, 'Gifts.xlsx');
        
  }
}
