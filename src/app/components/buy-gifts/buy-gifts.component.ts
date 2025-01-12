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

@Component({
  selector: 'app-buy-gifts',
  templateUrl: './buy-gifts.component.html',
  styleUrl: './buy-gifts.component.scss',
  encapsulation: ViewEncapsulation.None
  // providers: [GiftService],
})
export class BuyGiftsComponent {
  layout: 'list' | 'grid' = 'grid';
  // layout: string = 'grid';
  gifts!: Gift[];
  flag: boolean = false;
  giftService: GiftService = inject(GiftService)
  constructor(private router: Router) {}

  ngOnInit() {

    // data.slice(0, 12)
    this.giftService.getGifts().subscribe((data) => (this.gifts = data));
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

  addToCart(gift: Gift) {
      const giftForCart: GiftForCart = { ...gift, quantity: 1 };
      if (this.giftsOnCart.length > 0) {
        this.giftsOnCart.forEach((i) => {
          if (i.id == giftForCart.id) {
            if (i.quantity) {
              i.quantity++
              this.flag = true
            }
          }
        })
        if (!this.flag) {
          this.giftsOnCart.push(giftForCart)
        }
        this.flag = false
      }
      else {
        this.giftsOnCart.push(giftForCart)
      }
      localStorage.setItem('Cart', JSON.stringify(this.giftsOnCart));
      this.giftsOnCart = JSON.parse(localStorage.getItem('Cart') || '[]');

  }
  goToRegister(){
    this.router.navigate(['/register'])
  }
}

