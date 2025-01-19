import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { NavigationEnd, Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  // items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  // ngOnInit() {
  //     this.items = [
  //         { label: 'Home', icon: 'pi pi-home', route: '' },
  //         { label: 'Gifts', icon: 'pi pi-home', route: 'gifts' },
  //         { label: 'Donors', icon: 'pi pi-home', route: 'donors' },
  //         { label: 'Buy Gifts', icon: 'pi pi-home', route: 'buyGifts' },
  //         ];
  // }
  username!:string
  usernameStart!:string
  items: MegaMenuItem[] | undefined;

    ngOnInit() {
      localStorage.setItem("Cart", '[]')
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if(localStorage.getItem("userrole")=='Admin'){
            this.items = [
              { label: 'Home', icon: 'pi pi-home', route: '' },
              { label: 'Gifts', icon: 'pi pi-gift', route: 'gifts' },
              { label: 'Donors', icon: 'pi pi-user', route: 'donors' },
              { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
              { label: 'Lottery', icon: 'pi pi-trophy', route: 'lottery' },
              { label: 'Login', icon: 'pi pi-sign-in', route: 'login' },
            ];
          }
          else {
            this.items = [
                  { label: 'Home', icon: 'pi pi-home', route: '' },
                  { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
                  { label: 'Login', icon: 'pi pi-sign-in', route: 'login' },
                ];
          }
          if(localStorage.getItem("userfullname"))   {
            this.username=localStorage.getItem("userfullname") || ""
            this.usernameStart=localStorage.getItem("userfullname")?.substring(0,1).toUpperCase() || ""
          }
        }
      });
      
    }
    onClick(){
      // alert("1111")
    }
}
