import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, tap, map, first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-custom-stock-notification',
  templateUrl: './custom-stock-notification.component.html',
  styleUrls: ['./custom-stock-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,RouterModule,FormsModule]
})
export class CustomStockNotificationComponent implements OnInit, OnDestroy {

  hasProductInterests$: Observable<boolean>;
  prefsEnabled$: Observable<boolean>;
  outOfStock$: Observable<boolean>;
  isRemoveInterestLoading$: Observable<boolean>;
  anonymous = true;
  product$: Observable<any>;

  private enabledPrefs: any[] = [];
  private productCode: string;
  private subscribeSuccess$: Observable<boolean>;
  private subscriptions = new Subscription();

  constructor(
    private currentProductService: CustomCurrentProductService,
  ) {
  }

  ngOnInit() {
  }

  subscribe() {
    this.openDialog();
  }

  unsubscribe() {
  }

  private onInterestRemovingSuccess() {
    this.subscriptions.add(
    );
  }

  private onInterestAddingError() {
  }

  private openDialog() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
