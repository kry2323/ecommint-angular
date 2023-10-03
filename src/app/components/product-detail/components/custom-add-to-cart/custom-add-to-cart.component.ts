import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {CustomCurrentProductService} from 'src/app/custom-current-product.service';
import {CmsService} from 'src/app/cms.service';

@Component({
  selector: 'ozd-add-to-cart',
  templateUrl: './custom-add-to-cart.component.html',
  styleUrls:['./custom-add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,RouterModule]

})
export class CustomAddToCartComponent implements OnInit, OnDestroy {
  @Input() productCode: string;
  @Input() showQuantity = true;

  /**
   * As long as we do not support #5026, we require product input, as we need
   *  a reference to the product model to fetch the stock data.
   */
  @Input() product: any;

  productUnitCode: string;
  maxQuantity: number;
  minQuantity: number;
  quantityInterval:number;
  defaultPickerValue:number;
  modalRef: any;
  suitableForInstallment: boolean;

  hasStock = false;
  quantity: number = 1;
  increment = false;
  cartEntry$: Observable<any>;

  subscription: Subscription;
  cartSub: Subscription;

  addToCartForm: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });

  isMagaza: any;
  hasSizeVariant$: any;
  displayStatus = 'DISPLAY';
  productEntryOrder: any = null;
  cartLoaded$: Observable<boolean>;
  addToCartFormSub: Subscription;
  private errorSubscription: Subscription;
  isCreated = false;
  navCategory: any;

  constructor(
    private cd: ChangeDetectorRef,
    private productService:CustomCurrentProductService,
    private route:ActivatedRoute,
    private cms:CmsService,
  ) { }

  ngOnInit() {
    if (this.product) {
      this.productCode = this.product.code;
      this.setStockInfo(this.product);
      this.suitableForInstallment = this.product.suitableForInstallment;
      this.displayStatus = this.product.displayStatus;
      this.getCartEntry();
      this.cd.markForCheck();
      this.hasSizeVariant(this.product);
    } else if (this.productCode) {
      // force hasStock and quantity for the time being, as we do not have more info:
      this.quantity = 1;
      this.hasStock = true;
      this.getCartEntry();
      this.cd.markForCheck();
    } else {
    }


  }

  getCartEntry() {
    this.cartEntry$.pipe(
      distinctUntilChanged(),
      tap(() => {
        if (this.addToCartFormSub) {
          this.addToCartFormSub.unsubscribe();
        }
      }),
      filter(result => !!result),
      filter(result => result.product.code === this.productCode),
      ).subscribe(result => {
        this.increment = true;
        this.productEntryOrder = result;
        this.updateCount(result.quantity);

        this.addToCartForm.patchValue({quantity: this.quantity}, {emitEvent: false});
        this.addToCartForm.markAsPristine();
        this.getValueChange();
    });
  }

  private setStockInfo(product:any): void {
    this.quantity = 1;
    this.hasStock =
      product.stock && product.stock.stockLevelStatus !== 'outOfStock';
    if (this.hasStock && product.stock.stockLevel) {
      this.setCounterParameters(product);
    }
  }

  private setCounterParameters(product: any) {
    this.maxQuantity = product.maxOrderQuantity > product.stock.stockLevel ?
      product.stock.stockLevel : product.maxOrderQuantity;

    if (this.isUnitGram()) {
      this.maxQuantity = this.maxQuantity / 1000;
      this.minQuantity = product.minOrderQuantity / 1000;
      this.quantityInterval = product.orderQuantityInterval / 1000;
      this.defaultPickerValue = product.defaultPickerValue / 1000;
    }
    else {
      this.minQuantity = product.minOrderQuantity;
      this.quantityInterval = product.orderQuantityInterval;
      this.defaultPickerValue = product.defaultPickerValue;
    }
  }

  updateCount(value: number): void {
    this.quantity = +(this.isUnitGram() ? (value / 1000).toFixed(1) : value);
  }

  addToCart() {


  }

  addToAfadCart() {
  }

  private isUnitGram(): boolean{
    return this.productUnitCode === 'gram'
  }

  hasSizeVariant(product) {
    if (product && product.baseOptions.values() && product.baseOptions.length > 0) {
        for (const baseOption of product.baseOptions) {
        }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  showInstallmentsTab(): void {
  }

  // Get Tabs Component if exists on page
  private getTabsComponent(): Element {
    return null
  }

  // but part of tabs component. This is likely to change in refactor.
  private getDetailTabComponent(): Element {
    return null
  }

  // Click to activate tab if not already active
  private clickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  // Get Tab by label if exists on page
  private getTabByLabel(label: string, tabsComponent: Element): any {
    if (tabsComponent) {
      // NOTE: Reads through button tags to click on correct tab
      // There may be a better way of doing this now/after refactor
      const tabElements: HTMLCollectionOf<HTMLElement> = tabsComponent.getElementsByTagName(
        'button'
      );

      // Look through button tab elements until finding tab with label
      for (const buttonElement of Array.from(tabElements)) {
        if (buttonElement.innerHTML.includes(label)) {
          return buttonElement;
        }
      }
    }
  }

  setMessage(type: string): void {
  }

  catchErrors() {
  }

  private getValueChange() {

  }
}
