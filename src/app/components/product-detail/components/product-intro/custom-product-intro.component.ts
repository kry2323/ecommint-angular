import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CustomCurrentProductService} from 'src/app/custom-current-product.service';
import {CmsService} from 'src/app/cms.service';
import {LetDirective} from '@rx-angular/template/let';

@Component({
  selector: 'ozd-custom-product-intro',
  templateUrl: './custom-product-intro.component.html',
  styleUrls: ['./custom-product-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,RouterModule,LetDirective]
})
export class CustomProductIntroComponent implements OnInit {

  product$: Observable<any>=this.productService.getProduct();

  reviewsTabAvailable = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean>;
  reviewsSectionAvailable = new BehaviorSubject<boolean>(false);
  localKey = 'spartacus-product-detail-scroll';
  reviewSubscription: any;
  breakpoint: string;
  private isMobile: boolean;
  jsonLdContent: any;
  schemaBuild: any;

  constructor(
    private sanitizer: DomSanitizer,
    private productService:CustomCurrentProductService,
    private cmsService:CmsService,
  ) {
    this.reviewSubscription = this.reviewsSectionAvailable.subscribe(result => {
      if (result) {
        this.afterScroll();
      }
    });


  }

  ngOnInit(): void {
    this.isMobile = ['xs', 'sm'].includes(this.breakpoint);
  }

  ngAfterContentChecked(): void {
    this.reviewsTabAvailable.next(!!this.getReviewsComponent());
  }

  private getReviewsComponent(): any {
  }

  afterScroll(): void {

  }

  showReviews() {
    // Use translated label for Reviews tab reference
    }

  private getCustomReviewsComponent(): any {
  }

  // Click to activate tab if not already active
  private customClickTabIfInactive(tab: HTMLElement): void {
    if (
      !tab.classList.contains('active') ||
      tab.classList.contains('toggled')
    ) {
      tab.click();
    }
  }

  private getReviewTabComponent() {
  }
}
