import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftForCart } from '../../../domain/giftForCart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  gifts!: Gift[];
  currentGifts: GiftForCart[] = []

  constructor(
    private giftService: GiftService,
    private messageservice: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) { }

  ngOnInit() {
    this.gifts = JSON.parse(localStorage.getItem('Cart') || '[]');
  }
  payment() {
    if (localStorage.getItem("username")) {
      this.confirmationService.confirm({
        message: 'You are adding a new order to ' + localStorage.getItem("username") + ' to confirm?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const username = localStorage.getItem("username") || ""
          this.currentGifts = JSON.parse(localStorage.getItem("Cart") || '[]')
          this.giftService.postForCart(
            this.currentGifts,
            username
          ).subscribe((data) => {
            this.gifts = data
          })
          this.messageservice.add({
            severity: 'success',
            summary: 'Successful',
            detail: `The order of ${localStorage.getItem("username")} was successfully received.`,
            life: 3000,
          });
        },
      })
    }
    else {
      this.router.navigate(['/register'])
    }


  }

}

