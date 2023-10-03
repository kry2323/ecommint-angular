import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  TrackByFunction,
  ViewChild
} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MediaModule} from '../../media';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ComponentDataService} from 'src/app/component-data.service';
import {ProductService} from './product.service';
import {CustomProductGridItemComponent} from '../product-grid-item/custom-product-grid-item.component';
import {RxFor} from '@rx-angular/template/for';
import {LetDirective} from '@rx-angular/template/let';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';


@Component({
  selector: 'ozd-custom-product-carousel',
  templateUrl: './custom-product-carousel.component.html',
  styleUrls: ['./custom-product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,
    MediaModule ,
    ReactiveFormsModule,
    RouterModule,
    CustomProductGridItemComponent,
    RxFor,
    LetDirective,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomProductCarouselComponent {
  @ViewChild('swiperContainer', {static: false})
  swiperElement: ElementRef;

    constructor(private dataService: ComponentDataService,private productService:ProductService,private currentProductService:CustomCurrentProductService,
    ) {}

    quantity = 1;
    increment = false;
    itemHeight  = 420;
    itemWidth  = 190;
    itemSpace  = 12;
    arrowsOutside = true;

    isStoreTypeMarket: boolean;

    private productCode: any;
    arrows = true;



  title$: Observable<string>;
  private componentData$:any = this.dataService.getData()

  items$: Observable<any> = this.getProductsForCarousel().pipe(tap(() => {
      setTimeout(() => {
        if(this.swiperElement){
          const swiperEl: any = this.swiperElement.nativeElement;
          const swiperParams = {
            slidesPerView: 1,
            breakpoints: {
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween:  10,
              },
              1024:{
                slidesPerView: 6,
                spaceBetween: 20
              }
            },
          };

          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl, swiperParams);
          swiperEl?.initialize();
        }
      }, 400);
    })
  );

  trackByFn: TrackByFunction<any> = (_, product) => product.code;

  getProducts() {
    let productIds: string[] = [];
    this.componentData$.subscribe(
      (data) => {
        productIds = data.productCodes?.trim().split(' ').slice(0,16) || [];
      }
    );

    if (productIds.length > 0) {
      this.title$ = this.componentData$.pipe(map((data:any) => data.title));
      return this.productService.getCarouselProductsByIds(productIds);
    } else {
      return of(null);
    }
  }

  getProductsForCarousel(): Observable<any> {
    return this.getProducts()
      .pipe(
        filter(Boolean),
        map((res: any) => res.products),
        map(product => {
          return product.map(item => {
            item.images = item?.images?.filter(image => image.format === 'product');
            return item;
          });
        }),
        );
  }


    formatRibbon(ribbonText: string) {
      return ribbonText.replace('_', ' ')
    }

}
