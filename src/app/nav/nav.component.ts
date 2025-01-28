import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { NavigationEnd, Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from '../../service/global.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private globalService: GlobalService,
    private authService:AuthService
    ) { }

  username!: string
  usernameStart!: string
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    // this.items = [
    //   { label: 'Home', icon: 'pi pi-home', route: '' },
    //   { label: 'Gifts', icon: 'pi pi-gift', route: 'gifts' },
    //   { label: 'Donors', icon: 'pi pi-user', route: 'donors' },
    //   { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
    //   { label: 'Cart', icon: 'pi pi-shopping-bag', route: 'cart' },
    //   { label: 'Lottery', icon: 'pi pi-trophy', route: 'lottery' },
    // ];

    this.globalService.getIsAdmin().subscribe((isAdmin) => {
      if(isAdmin){
      this.items = [
        { label: 'Home', icon: 'pi pi-home', route: '' },
        { label: 'Gifts', icon: 'pi pi-gift', route: 'gifts' },
        { label: 'Donors', icon: 'pi pi-user', route: 'donors' },
        { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
        { label: 'Cart', icon: 'pi pi-shopping-bag', route: 'cart' },
        { label: 'Lottery', icon: 'pi pi-trophy', route: 'lottery' },
      ];
      }
      else {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', route: '' },
          { label: 'Buy Gifts', icon: 'pi pi-shopping-bag', route: 'buyGifts' },
          { label: 'Cart', icon: 'pi pi-shopping-bag', route: 'cart' },
        ];
      }
     
    })
    this.globalService.getUserConnect().subscribe((username)=>{
        this.username = username
        this.usernameStart = username?.substring(0, 1).toUpperCase() || ""
    })
   
  }

  navigateToLogin(){
    this.globalService.setVisibleLogin(true)
    this.router.navigate(['/login'])
  }
  logOut(){
    this.authService.logOut()
  }
}



