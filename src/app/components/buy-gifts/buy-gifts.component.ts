import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GiftForCart } from '../../../domain/giftForCart';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GlobalService } from '../../../service/global.service';

@Component({
  selector: 'app-buy-gifts',
  templateUrl: './buy-gifts.component.html',
  styleUrl: './buy-gifts.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [GiftService,MessageService,ConfirmationService]
})
export class BuyGiftsComponent {
  layout: 'list' | 'grid' = 'grid';
  gifts!: GiftForCart[];
  flag: boolean = false;
  giftService: GiftService = inject(GiftService)
  quantity:number=1
  visible!: boolean
  
  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
    
    ) {}

  ngOnInit() {
    this.globalService.getIsLoterryActive().subscribe((data)=>{
      this.visible=data
    })
    this.giftService.getGifts().subscribe((data) => (
      this.gifts = data.map((gift) => ({
        ...gift,
        quantity: 1,
      }))
      ));
  }
  
  // getSeverity(gift: Gift) {
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

  // giftsOnCart: Gift[]=JSON.parse(localStorage.getItem('Cart') || '[]');
  giftsOnCart: GiftForCart[] = JSON.parse(localStorage.getItem('Cart') || '[]');
  addToCart(giftForCart: GiftForCart) {
    giftForCart.usersList=[]
    giftForCart.winner={
        id: 1,
        phone: "1",
        adress: "1",
        creditCard: "1",
        role: "User",
        email: "2@2.2",
        fullName: "1",
        password: "1"
    }
    const index = this.giftsOnCart.findIndex((g)=>
      g.id===giftForCart.id
    )
    if(index>=0){
      this.giftsOnCart[index]=giftForCart
      this.messageService.add(
        {
            severity: 'success',
            summary: 'Successful',
            detail: `${giftForCart.quantity} of ${giftForCart.name} update in cart successfully!`,
            life: 3000,
        })
    }
    else {
      this.giftsOnCart.push(giftForCart)
      this.messageService.add(
      {
          severity: 'success',
          summary: 'Successful',
          detail: `${giftForCart.quantity} of ${giftForCart.name} add to cart successfully!`,
          life: 3000,
        }
      )
    }
    localStorage.setItem('Cart', JSON.stringify(this.giftsOnCart));
    this.giftsOnCart = JSON.parse(localStorage.getItem('Cart') || '[]');
  }



}


// addToCart(gift: Gift) {
//   const giftForCart: GiftForCart = { ...gift, quantity: 1 };
//   if (this.giftsOnCart.length > 0) {
//     this.giftsOnCart.forEach((i) => {
//       if (i.id == giftForCart.id) {
//         if (i.quantity) {
//           i.quantity++
//           this.flag = true
//         }
//       }
//     })
//     if (!this.flag) {
//       this.giftsOnCart.push(giftForCart)
//     }
//     this.flag = false
//   }
//   else {
//     this.giftsOnCart.push(giftForCart)
//   }
//   localStorage.setItem('Cart', JSON.stringify(this.giftsOnCart));
//   this.giftsOnCart = JSON.parse(localStorage.getItem('Cart') || '[]');

// }