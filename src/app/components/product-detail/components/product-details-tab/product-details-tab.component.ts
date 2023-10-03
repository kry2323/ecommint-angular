import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';
import { LetDirective } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';

@Component({
    selector: 'ozd-product-details-tab',
    templateUrl: './product-details-tab.component.html',
    styleUrls: ['./product-details-tab.component.scss'],
    standalone:true,
    imports:[CommonModule,LetDirective,RxFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit, OnDestroy {

    product$: Observable<any> =this.currentProductService.getProduct()
    isMarket: any;
    productCode: any;
    product: any = [];

    constructor(
        protected currentProductService: CustomCurrentProductService,
        @Inject(PLATFORM_ID) private platform: any,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}
