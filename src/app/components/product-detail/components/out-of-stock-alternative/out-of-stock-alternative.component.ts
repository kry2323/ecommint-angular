import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@rx-angular/template/let';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-out-of-stock-alternative',
  templateUrl: './out-of-stock-alternative.component.html',
  styleUrls: ['./out-of-stock-alternative.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,LetDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutOfStockAlternativeComponent implements OnDestroy {

  product$: Observable<any>=this.productService.getProduct();
  alternativeRequested: boolean;
  cartEntry: any;
  cartId: string;
  userId: string;
  productSub: Subscription;

  constructor(
    private productService:CustomCurrentProductService
  ) {
    this.alternativeRequested = true;

  }

  changeAlternativeProduct(): void {
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }
}
