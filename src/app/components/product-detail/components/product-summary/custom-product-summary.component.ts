import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@rx-angular/template/let';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-product-summary',
  templateUrl: './custom-product-summary.component.html',
  styleUrls: ['./custom-product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,LetDirective]
})
export class CustomProductSummaryComponent implements OnInit, OnDestroy{

  constructor(
    private productService:CustomCurrentProductService,
  ) {
  }

  product$: Observable<any>=this.productService.getProduct();

  ngOnDestroy(): void {
    this.setrowIntegrationClean();
  }

  ngOnInit(): void {
    this.setrowIntegrationInit();
  }

  /**
   * Setrow Integration for "Products Reviewed" Info Gathering Goal
   */
  async setrowIntegrationInit(): Promise<void> {
  }

  /**
   * Setrow Integration Clean all info and script extensions (We don't know about; new arrival link is product or not)
   */
  setrowIntegrationClean(): void {
  }

  /**
   * Setrow Script adding
   */
  async setrowIntegrationScriptInit(): Promise<void> {
  }

  async setrowCartScriptInit(productCode: string): Promise<void> {
  }
}
