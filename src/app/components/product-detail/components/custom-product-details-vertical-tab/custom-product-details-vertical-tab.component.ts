import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-custom-product-details-vertical-tab',
  templateUrl: './custom-product-details-vertical-tab.component.html',
  styleUrls: ['./custom-product-details-vertical-tab.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomProductDetailsVerticalTabComponent implements OnInit {
  product$: Observable<any>=this.productService.getProduct();
  navCategory: any;

  constructor(private productService:CustomCurrentProductService
  ) { }

  ngOnInit(): void {
  }

  showInstallmentsTab(): void {

  }

  showDeliveryReturnTab(): void {

  }
  showFinInStoreTab(): void {

  }
  onShowDetailTab(): void {

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

}
