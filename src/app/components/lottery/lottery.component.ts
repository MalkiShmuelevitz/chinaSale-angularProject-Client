import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { GiftWithUserService } from '../../../service/giftWithUser.service';
import { GiftWithUser } from '../../../domain/giftWithUser';
import { User } from '../../../domain/user';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss'
})
export class LotteryComponent {
  gifts!: GiftWithUser[];
  users:User[]=[]
  srvGiftsWithUser=inject(GiftWithUserService)
  dialogShowUsers: boolean = false;
    constructor(private giftService: GiftService) {}

    ngOnInit() {
      this.srvGiftsWithUser.getGifts().subscribe((data)=>{
        this.gifts=data;
        // console.log(this.gifts);
      })
    }
    getWinners(){
      this.srvGiftsWithUser.getWithRandom().subscribe((data)=>{
        this.gifts=data;
        // console.log(this.gifts);
      })
    }
    showUsers(gift:GiftWithUser){
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

