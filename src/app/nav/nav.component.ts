import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  // items: MenuItem[] | undefined;

  // constructor(private router: Router) {}

  // ngOnInit() {
  //     this.items = [
  //         { label: 'Home', icon: 'pi pi-home', route: '' },
  //         { label: 'Gifts', icon: 'pi pi-home', route: 'gifts' },
  //         { label: 'Donors', icon: 'pi pi-home', route: 'donors' },
  //         { label: 'Buy Gifts', icon: 'pi pi-home', route: 'buyGifts' },
  //         ];
  // }

  items: MegaMenuItem[] | undefined;

    ngOnInit() {
           this.items = [
          { label: 'Home', icon: 'pi pi-home', route: '' },
          { label: 'Gifts', icon: 'pi pi-gift', route: 'gifts' },
          { label: 'Donors', icon: 'pi pi-user', route: 'donors' },
          { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
          { label: 'Register', icon: 'pi pi-user-plus', route: 'register' },
          ];
    }
}
