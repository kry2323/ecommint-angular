import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MediaModule } from 'src/app/components/media';

@Component({
  selector: 'ozd-vertical-product-carousel',
  templateUrl: './vertical-product-carousel.component.html',
  styleUrls: ['./vertical-product-carousel.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,MediaModule]
})
export class VerticalProductCarouselComponent implements OnInit {

  quantity = 1;
  increment = false;

  isStoreTypeMarket: boolean;

  constructor(
  ) {
  }

  private componentData$: Observable<any> ;

  title$: Observable<string>;

  items$: Observable<Observable<any>[]> = this.getProductsForCarousel();

  getProducts() {
    let productIds: string[] = [];
    this.componentData$.subscribe(
      (data) => {
        productIds = data.productCodes?.trim().split(' ') || [];
      }
    );

    if (productIds.length > 0) {
    }

    return of(null);
  }

  getProductsForCarousel(): any{
    
  }

  ngOnInit(): void {
  }

}
