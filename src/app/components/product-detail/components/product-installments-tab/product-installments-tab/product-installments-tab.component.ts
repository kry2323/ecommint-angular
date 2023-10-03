import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-product-installments-tab',
  templateUrl: './product-installments-tab.component.html',
  styleUrls: ['./product-installments-tab.component.scss'],
  standalone:true,
  imports:[CommonModule,LetDirective,RxFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInstallmentsTabComponent implements OnInit {

  product$: Observable<any> = this.currentProductService.getProduct();
  maxInstallments: number[];

  constructor(
    private currentProductService: CustomCurrentProductService,
  ) { }

  ngOnInit(): void {
    this.getMaxInstallments();
  }

  getMaxInstallments() {
    this.product$.subscribe(result => {

      if (result && result.installments) {
        let installments: number = 0;

        result.installments.forEach(item => {
          const count: number = Math.max.apply(Math, item.installments.map(o => o.count));

          if (count > installments) {
            installments = count;
          }
        });

        this.maxInstallments = Array.from({length: installments}, (v, k) => k+1);

        this.maxInstallments = this.maxInstallments.filter(i => i !== 1);
      }
    });
  }

  installmentsFind(i: number, installments: any[]) {
    return installments.find(item => item.count === i) || false;
  }

}
