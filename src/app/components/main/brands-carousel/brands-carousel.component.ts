import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MediaModule} from '../../media';
import {LetDirective} from '@rx-angular/template/let';
import {RxFor} from '@rx-angular/template/for';
import {BrandsService} from './brands.service';
import {ImageLazyLoadDirective} from "../../../shared/image-lazy-load.directive";

@Component({
  selector: 'ozd-brands-carousel',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    LetDirective,
    RxFor,
    ImageLazyLoadDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrandsCarouselComponent  {
  @ViewChild('swiperContainer3', {static: false})
  swiperElement: ElementRef;

  brands$ = this.brandService.getBrands().pipe(
    tap(() => {
      setTimeout(() => {
        if (this.swiperElement) {
          const swiperEl: any = this.swiperElement.nativeElement;
          swiperEl?.initialize();
        }
      }, 400);
    }),
    map(response => response.categoryList)
  );

  constructor(private brandService: BrandsService
  ) {
  }
}
