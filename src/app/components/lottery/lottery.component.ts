import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { GiftWithUser } from '../../../domain/giftWithUser';
import { User } from '../../../domain/user';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss'
})
export class LotteryComponent {
  gifts!: Gift[];
  users:User[]=[]
  srvGift=inject(GiftService)
  dialogShowUsers: boolean = false;
  constructor(private giftService: GiftService) {}

    ngOnInit() {
      // this.srvGiftsWithUser.getGifts().subscribe((data)=>{
      //   this.gifts=data;
      //   // console.log(this.gifts);
      // })
      this.srvGift.getGifts().subscribe((data)=>{
        this.gifts=data;
        console.log(this.gifts);
        
      })
    }
    getWinners(){
      // this.srvGiftsWithUser.getWithRandom().subscribe((data)=>{
      //   this.gifts=data;
      //   // console.log(this.gifts);
      // })
      this.srvGift.getWithRandom().subscribe((data)=>{
        this.gifts=data
      })
    }
    showUsers(gift:Gift){
      this.users = gift.usersList || []
      console.log(gift);
      this.dialogShowUsers=true
    }
    // getSeverity (gift: Gift) {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };
}

