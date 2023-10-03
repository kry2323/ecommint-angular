import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@rx-angular/template/let';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-product-detail-campaign-cards',
  templateUrl: './product-detail-campaign-cards.component.html',
  styleUrls: ['./product-detail-campaign-cards.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,LetDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailCampaignCardsComponent {
  product$: Observable<any>=this.productService.getProduct();

  constructor(
    private productService:CustomCurrentProductService
  ) { }

  forNewLine = (text: string): string => {
    if (text) {
      const wordCount = text.split('_');

      if (wordCount.length > 1) {
        wordCount[0] = `<span class="highlight">${wordCount[0]}</span>`;
      }

      return wordCount.join('');
    }

    return text;
  }
}
