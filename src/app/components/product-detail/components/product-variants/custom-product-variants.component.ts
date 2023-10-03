import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, Inject} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {tap, filter, distinctUntilKeyChanged} from 'rxjs/operators';
import {VariantType} from './models/product.model';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ozd-product-variants',
  templateUrl: './custom-product-variants.component.html',
  styleUrls: ['./custom-product-variants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,RouterModule],
})
export class CustomProductVariantsComponent implements OnInit, OnDestroy {
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  variants: {
    [key: string]: any;
  };
  variantType = VariantType as any;
  lowStockAlert = 3;

  @Input() product$: Observable<any>;
  @Input() isReturn;
  @Output() selectedCode = new EventEmitter<any>();

  private initializedSub: Subscription;
  private productSub: Subscription;
  private initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  initSizeModal: any;

  ngOnInit(): void {

    this.getProduct();

    this.initializedSub = this.initialized.subscribe(result => {
      if (result) {
        this.productSub.unsubscribe();
      }
    });
  }

  changeReturnProduct($event: Observable<any>) {
    if (!this.isReturn) {
      $event.subscribe(product => {
      });
    }

    this.product$ = $event;
    this.getProduct();
  }

  private getProduct() {
      this.productSub = this.product$?.pipe(
      filter((product) => !!(product && product.baseOptions)),
      distinctUntilKeyChanged('code'),
      tap((product) => {
        this.setVariants(product?.baseOptions);
        this.initialized.next(true);
      })
    ).subscribe();
  }

  sendSelectedCode($event: any) {
    this.selectedCode.emit($event);
  }

  unsetVariants() {
    this.variants = {};
    this.variants[this.variantType.STYLE] = null;
    this.variants[this.variantType.COLOR] = null;
    this.variants[this.variantType.SIZE] = null;
  }

  setVariants(baseOptions): void {
    this.unsetVariants();

    baseOptions?.forEach((option) => {
      if (option && option.variantType) {
        this.variants[option.variantType] = option;
      }
    });

    this.cd.detectChanges();
  }

  shipmentRegex(text: string): string {
    const patt = /En geç (.+) kargoda/i;
    const result = text.match(patt);

    if (result[1]) {
      text = text.replace(result[1], `<strong>${result[1]}</strong>`);
    }

    return text;
  }

  

  ngOnDestroy() {
    this.initializedSub?.unsubscribe();
    this.productSub?.unsubscribe();
    this.initSizeModal?.unmount();
  }
}
