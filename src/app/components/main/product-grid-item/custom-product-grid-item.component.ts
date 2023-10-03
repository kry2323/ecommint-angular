import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {MediaModule} from '../../media';
import {RouterModule} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ProductService} from '../product-carousel/product.service';
import {ImageLazyLoadDirective} from "../../../shared/image-lazy-load.directive";

@Component({
    selector: 'ozd-custom-product-grid-item',
    templateUrl: './custom-product-grid-item.component.html',
    styleUrls: ['./custom-product-grid-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:true,
    imports:[CommonModule,  MediaModule,  RouterModule, ImageLazyLoadDirective],
})
export class CustomProductGridItemComponent implements OnInit, OnDestroy {

    private _product: any;
    @Input()
    public set product(value: any) {
      value?.badges?.map(item => {
        item.ribbon = item?.ribbon?.replace('_', ' ');
        return item;
      });

      if (!value.orderQuantityInterval) {
        value.orderQuantityInterval = 1;

        if (value.unit.code === 'gram'){
          value.orderQuantityInterval = 100;
        }
      }


      this._product = value;
    }

    public get product(): any {
      return this._product;
    }

    @Input() wishListId: string;
    isStoreTypeMarket: boolean;
    private productCode: any;
    increment = false;
    quantity = 1;
    @Output() wishListChanged = new EventEmitter<string>();

    @HostBinding('title') get gridTitle() {
      return this.product.name;
    }


    cartLoaded$: Observable<boolean>;
    cartLoadLayer$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    form: FormGroup;
    customPorduct: any = null;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    orderQuantityInterval: number;
    defaultPickerValue: number;
    isCurrent = false;
    addedCode = '';
    sub: Subscription;
    private errorSubscription: Subscription;

    constructor(
      private customProductService: ProductService,
      private cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
    }



  onChangeWishList(event) {
    this.wishListChanged.emit(this.product.code);
  }

  getImageUrl(): string {
    const images = this.product.images;
    if (images instanceof Array){
      return images.find(x => x.format === 'product')?.url;
    }
    return images && images.PRIMARY &&
    images.PRIMARY['product'] && images.PRIMARY['product']?.url ? images.PRIMARY['product'].url : null;
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.errorSubscription?.unsubscribe();
  }
}
