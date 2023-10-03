import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-add-to-wish-list',
  templateUrl: './custom-add-to-wish-list.component.html',
  styleUrls: ['./custom-add-to-wish-list.component.scss'],
  standalone:true,
  imports:[ReactiveFormsModule,RouterModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAddToWishListComponent  {

  product$: Observable<any>;

  wishListId: string;
  wishListEntries$: Observable<any>;
  hasStock = false;

  constructor(
    private currentProductService: CustomCurrentProductService,
  ) {

  }

  addToDefaultWishlist(product) {
  }
  remove(entry: any) {
  }

  protected setStockInfo(product: any): void {
    this.hasStock = Boolean(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );
  }
}
