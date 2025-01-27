import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { GiftWithUser } from '../../../domain/giftWithUser';
import { User } from '../../../domain/user';
import { GlobalService } from '../../../service/global.service';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.scss'
})
export class LotteryComponent {
  gifts!: Gift[];
  gift!: Gift
  users:User[]=[]
  dialogShowUsers: boolean = false;
  visible:boolean=false
  loading:boolean=false
  constructor(
    private giftService: GiftService,
    private globalService:GlobalService
    ) {}

    ngOnInit() {
      this.globalService.getIsLoterryActive().subscribe((data)=>{
        // console.log(data);
        this.visible = data
      })
      this.giftService.getGifts().subscribe((data)=>{
        this.gifts=data;
      })
    }
    getWinners() {
      this.globalService.setIsLoterryActive(false); // הפעלת ה-progress bar
      this.loading=true
      setTimeout(() => {
          this.giftService.getWithRandom().subscribe((data) => {
              this.gifts = data;
              this.loading=false
          });
      }, 5000);
  }
  
    showUsers(gift:Gift){
      this.users = gift.usersList || []
      this.dialogShowUsers=true
    }

}

