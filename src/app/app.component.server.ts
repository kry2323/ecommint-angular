import {ChangeDetectionStrategy, Component, NgZone, inject} from '@angular/core';
import { ZonelessRouting } from './shared/zone-less/zone-less-routing.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import {PageLayoutComponent} from "./page-layout/page-layout.component";
import {BannerBoxComponent} from "./components/banner-box/banner-box.component";
import {COMPONENTS} from "./cms-token";
import {ParagraphComponent} from "./components/paragraph/paragraph.component";
import { HeaderLoginComponent } from './components/navigation/header-login/header-login.component';
import { CustomSearchBoxComponent } from './components/navigation/search-box-component/custom-search-box.component';
import { CustomMiniCartComponent } from './components/navigation/mini-cart/custom-mini-cart.component';
import { CustomBannerCarouselComponent } from './components/main/banner-carousel/banner-carousel.component';
import { CommonModule } from '@angular/common';
import { CustomProductCarouselComponent } from './components/main/product-carousel/custom-product-carousel.component';
import { ComponentContainerComponent } from './components/main/component-container/component-container.component';
import { CustomBannerComponent } from './components/banner/custom-banner.component';
import { CustomSimpleBannerComponent } from './components/banner/custom-simple-banner/custom-simple-banner.component';
import { CmsService } from './cms.service';
import { CustomNgZone } from './shared/zone-less/custom-zone';
import { tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { MarketParagraphComponent } from './components/navigation/market-paragraph/market-paragraph.component';
import { MagazaParagraphComponent } from './components/navigation/magaza-paragraph/magaza-paragraph.component';
import { CustomDeliveryRegionComponent } from './components/delivery/delivery-region/custom-delivery-region.component';
import { CustomDeliveryTimeComponent } from './components/delivery/delivery-time/custom-delivery-time.component';
import { LetDirective } from '@rx-angular/template/let';
import { CustomRotatingProductImagesComponent } from './components/main/rotating-product-images/custom-rotating-product-images.component';
import { SocialMediaComponent } from './components/footer/social-media/social-media.component';
import { CustomCategoryNavigationComponent } from './components/main/category-navigation/custom-category-navigation.component';
import { BrandsCarouselComponent } from './components/main/brands-carousel/brands-carousel.component';
import { FooterNavigationComponent } from './components/footer/footer-navigation/footer-navigation.component';
import { CustomProductIntroComponent } from './components/product-detail/components/product-intro/custom-product-intro.component';
import { CustomProductImagesComponent } from './components/product-detail/components/custom-product-images/custom-product-images.component';
import { CustomProductSummaryComponent } from './components/product-detail/components/product-summary/custom-product-summary.component';
import { CustomAddToCartComponent } from './components/product-detail/components/custom-add-to-cart/custom-add-to-cart.component';
import { OutOfStockAlternativeComponent } from './components/product-detail/components/out-of-stock-alternative/out-of-stock-alternative.component';
import { ProductDetailCampaignCardsComponent } from './components/product-detail/components/product-detail-campaign-cards/product-detail-campaign-cards.component';
import { CustomStockNotificationComponent } from './components/product-detail/components/custom-stock-notification/custom-stock-notification.component';
import { CustomAddToWishListComponent } from './components/product-detail/components/product-detail/custom-add-to-wish-list.component';
import { CustomProductVariantsComponent } from './components/product-detail/components/product-variants/custom-product-variants.component';
import { VerticalProductCarouselComponent } from './components/product-detail/components/vertical-product-carousel/vertical-product-carousel.component';
import { CustomTabParagraphContainerComponent } from './components/product-detail/components/tab-paragraph-container/custom-tab-paragraph-container/custom-tab-paragraph-container.component';
import { ProductDetailsTabComponent } from './components/product-detail/components/product-details-tab/product-details-tab.component';
import { ProductInstallmentsTabComponent } from './components/product-detail/components/product-installments-tab/product-installments-tab/product-installments-tab.component';
import { CustomProductReviewsTabComponent } from './components/product-detail/components/product-reviews-tab/custom-product-reviews-tab/custom-product-reviews-tab.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    BrowserModule,
    CommonModule,
    CustomDeliveryTimeComponent,
    PageLayoutComponent,
    RouterOutlet,
    RouterModule,
    ComponentContainerComponent,
    BannerBoxComponent,
    VerticalProductCarouselComponent,
    CustomTabParagraphContainerComponent,
    CustomDeliveryRegionComponent,
    CustomStockNotificationComponent,
    CustomBannerComponent,
    CustomAddToWishListComponent,
    CustomSimpleBannerComponent,
    MarketParagraphComponent,
    MagazaParagraphComponent,
    CustomProductVariantsComponent,
    CustomCategoryNavigationComponent,
    ProductInstallmentsTabComponent,
    OutOfStockAlternativeComponent,
    ProductDetailCampaignCardsComponent,
    ParagraphComponent,
    CustomProductImagesComponent,
    ProductDetailsTabComponent,
    CustomProductSummaryComponent,
    HeaderLoginComponent,
    CustomProductReviewsTabComponent,
    SocialMediaComponent,
    FooterNavigationComponent,
    BrandsCarouselComponent,
    CustomSearchBoxComponent,
    CustomProductCarouselComponent,
    CustomAddToCartComponent,
    CustomMiniCartComponent,
    LetDirective,
    CustomBannerCarouselComponent,
    CustomProductIntroComponent,
    CustomRotatingProductImagesComponent,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppServerComponent {
  /**
   *  **🚀 Perf Tip:**
   *
   *  In zone-less applications we have to handle routing manually.
   *  This is a necessity to make it work zone-less but does not make the app faster.

   import { ZonelessRouting } from './shared/zone-agnostic/zone-less-routing.service';

   constructor(private zonelessRouting: ZonelessRouting) {
       this.zonelessRouting.init();
     }
   *
   */
  template$ = this.cmsService.getTemplate().pipe(tap(console.log))
  constructor(private  cmsService: CmsService) {
    inject(ZonelessRouting).init();
  }

}
