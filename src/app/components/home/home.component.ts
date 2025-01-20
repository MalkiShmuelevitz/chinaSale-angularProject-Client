import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { PhotoService } from '../../../service/photo.service';
import { Gift } from '../../../domain/gift';
import { GiftService } from '../../../service/gift.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images!: string[] ;

  responsiveOptions: any[] | undefined;

  constructor(private productService: GiftService) {}

  ngOnInit() {
      // this.productService.getGifts().subscribe((products) => {
      //     this.gifts = products;
      // });
      this.images=[
        "assets/1.jpg",
        "assets/2.jpg",
        "assets/3.jpg",
        "assets/4.jpg",
        "assets/5.jpg",
        "assets/6.jpg",
        
      ]
      this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
      return 'warning'
  }
}
