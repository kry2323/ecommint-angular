import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostBinding,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {Observable} from "rxjs";
import {concatAll, filter, map, switchMap, tap} from 'rxjs/operators';
import {ComponentDataService} from 'src/app/component-data.service';
import {CmsService} from 'src/app/cms.service';
import {GenericLinkComponent} from '../../generic-link';
import {MediaModule} from '../../media';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LetDirective} from '@rx-angular/template/let';
import {RxFor} from '@rx-angular/template/for';

@Component({
  selector: 'ozd-rotating-product-images',
  templateUrl: './custom-rotating-product-images.component.html',
  styleUrls: ['./custom-rotating-product-images.component.scss'],
  standalone: true,
  imports: [
    GenericLinkComponent,
    MediaModule,
    RouterModule, CommonModule, LetDirective, RxFor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRotatingProductImagesComponent {

  @ViewChild('swiperContainer2', {static: false})
  swiperElement: ElementRef;

  itemWidth: number = 400;

  private componentData$: Observable<any> = this.componentData.getData();


  items$: any = this.componentData$.pipe(
    map((data) => data.banners.trim().split(' ')),
    switchMap((codes) => this.cmsService.getComponentData(codes)),
    map(data => data.component.filter(component => component.media)),
    tap(() => {
      setTimeout(() => {
        const swiperEl: any = this.swiperElement.nativeElement;
        const swiperParams = {
          slidesPerView: 1,
          breakpoints: {
            320: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween:  10,
            },
            1024:{
              slidesPerView: 3,
              spaceBetween: 20
            }
          },

        };
        Object.assign(swiperEl, swiperParams);
        swiperEl?.initialize();
      }, 400);
    })
  );


  constructor(
    private componentData: ComponentDataService,
    private cmsService: CmsService,
  ) {
  }

  getItems(): Observable<Observable<any>[]> {
    return this.items$;
  }

}
