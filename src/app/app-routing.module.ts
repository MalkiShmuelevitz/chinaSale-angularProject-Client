import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddDonorComponent } from './components/donor/add-donor/add-donor.component';
import { ManageDonorComponent } from './components/donor/manage-donor/manage-donor.component';
import { UpdateDonorComponent } from './components/donor/update-donor/update-donor.component';
import { TableGiftsDemoComponent } from './components/gift/table-gifts-demo/table-gifts-demo.component';
import { AddGiftComponent } from './components/gift/add-gift/add-gift.component';
import { UpdateGiftComponent } from './components/gift/update-gift/update-gift.component';
import { BuyGiftsComponent } from './components/buy-gifts/buy-gifts.component';
import { RegisterComponent } from './components/register/register.component';
import { LotteryComponent } from './components/lottery/lottery.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from '../service/auth.service';
import { CartComponent } from './components/cart/cart.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent, pathMatch: 'full'},
//   { path: 'buyGifts', component: BuyGiftsComponent, pathMatch: 'full' },
//   { path: 'register', component: RegisterComponent, pathMatch: 'full' },
//   { path: 'login', component: LoginComponent, pathMatch: 'full' },
//   { path: 'cart', component: CartComponent, pathMatch: 'full' },
//   { path: 'lottery', component: LotteryComponent, pathMatch: 'full' },
//   {path: 'donors', component: ManageDonorComponent, children: [
//       { path: 'add', component: AddDonorComponent },
//       { path: 'update', component: UpdateDonorComponent },
//     ]
//   },
//   {path: 'gifts', component: TableGiftsDemoComponent, children: [
//       { path: 'add', component: AddGiftComponent },
//       { path: 'update', component: UpdateGiftComponent }
//     ]
//   },
//   // {path: '**', component:NotFoundComponent}
// ];
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'buyGifts', component: BuyGiftsComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent, pathMatch: 'full' },
  { path: 'lottery', component: LotteryComponent,canActivate:[AuthService], pathMatch: 'full' },
  {path: 'donors', component: ManageDonorComponent,canActivate:[AuthService], children: [
      { path: 'add', component: AddDonorComponent },
      { path: 'update', component: UpdateDonorComponent },
    ]
  },
  {path: 'gifts', component: TableGiftsDemoComponent,canActivate:[AuthService], children: [
      { path: 'add', component: AddGiftComponent },
      { path: 'update', component: UpdateGiftComponent }
    ]
  },
  // {path: '**', component:NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
 

}
