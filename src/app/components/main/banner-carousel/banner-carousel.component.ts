import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostBinding,
  ViewChild
} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MediaModule} from '../../media';
import {CmsService} from 'src/app/cms.service';
import {GenericLinkComponent} from '../../generic-link';
import {ComponentDataService} from 'src/app/component-data.service';
import {LetDirective} from '@rx-angular/template/let';
import {RxFor} from '@rx-angular/template/for';
import {isNotNullable} from 'src/app/utils/type-guards';
import {ImageLazyLoadDirective} from "../../../shared/image-lazy-load.directive";

/**
 * Generic carousel that renders CMS Components.
 */
@Component({
  selector: 'ozd-banner-carousel',
  templateUrl: 'banner-carousel.component.html',
  styleUrls: ['banner-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule,
    MediaModule,
    NgOptimizedImage,
    GenericLinkComponent,
    LetDirective,
    RxFor,
    ImageLazyLoadDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomBannerCarouselComponent {

  @ViewChild('mainSwiperContainer', {static: false})
  swiperElement: ElementRef;
  @ViewChild('preloadImage', {static: false})
  preloadImageElement: ElementRef;

  @HostBinding('class') theme = '';
  data$ = this.dataService.getData()

  constructor(private dataService: ComponentDataService, private cmsService: CmsService) {
  }

  items$: any = this.data$.pipe(
    map((data) => data.banners.trim().split(' ').join(',')),
    filter(isNotNullable),
    switchMap((data) => this.cmsService.getComponentData(data)),
    map(data => data.component.filter(component => component.media)),
    tap(() => {
      setTimeout(() => {
        if (this.swiperElement) {
          this.swiperElement.nativeElement.addEventListener('slidechange', (event) => {
            this.preloadImageElement.nativeElement.setAttribute('style', 'display: none;');
          });
          const swiperEl: any = this.swiperElement.nativeElement;
          const swiperParams = {
            slidesPerView: 1,
            pagination: true,
            navigation: true,

          };

          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl, swiperParams);
          swiperEl?.initialize();
        }
      }, 400);
    })
  );
}
