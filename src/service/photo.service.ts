import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  getData() {
    return [
        {
            itemImageSrc: 'assets/1.jpg',
            thumbnailImageSrc: 'assets/1.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
          itemImageSrc: 'assets/2.jpg',
          thumbnailImageSrc: 'assets/2.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
        itemImageSrc: 'assets/3.jpg',
        thumbnailImageSrc: 'assets/3.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
    },
    {
      itemImageSrc: 'assets/4.jpg',
      thumbnailImageSrc: 'assets/4.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/5.jpg',
    thumbnailImageSrc: 'assets/5.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
{
  itemImageSrc: 'assets/6.jpg',
  thumbnailImageSrc: 'assets/6.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: 'assets/18.jpg',
  thumbnailImageSrc: 'assets/18.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: 'assets/8.jpg',
  thumbnailImageSrc: 'assets/8.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: 'assets/9.jpg',
  thumbnailImageSrc: 'assets/9.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},    
{
  itemImageSrc: 'assets/10.jpg',
  thumbnailImageSrc: 'assets/10.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
}];
}

getImages() {
    return Promise.resolve(this.getData());
}
}
