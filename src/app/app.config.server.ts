import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { provideHttpClient } from '@angular/common/http';
import { COMPONENTS } from './cms-token';
import {BannerBoxComponent} from "./components/banner-box/banner-box.component";
import {ParagraphComponent} from "./components/paragraph/paragraph.component";
import { HeaderLoginComponent } from './components/navigation/header-login/header-login.component';
import { CustomSearchBoxComponent } from './components/navigation/search-box-component/custom-search-box.component';
import { CustomMiniCartComponent } from './components/navigation/mini-cart/custom-mini-cart.component';
import { CustomBannerCarouselComponent } from './components/main/banner-carousel/banner-carousel.component';
import { CustomProductCarouselComponent } from './components/main/product-carousel/custom-product-carousel.component';
import { ComponentContainerComponent } from './components/main/component-container/component-container.component';
import { CustomBannerComponent } from './components/banner/custom-banner.component';
import { CustomSimpleBannerComponent } from './components/banner/custom-simple-banner/custom-simple-banner.component';
import { MarketParagraphComponent } from './components/navigation/market-paragraph/market-paragraph.component';
import { MagazaParagraphComponent } from './components/navigation/magaza-paragraph/magaza-paragraph.component';
import { CustomDeliveryRegionComponent } from './components/delivery/delivery-region/custom-delivery-region.component';
import { CustomDeliveryTimeComponent } from './components/delivery/delivery-time/custom-delivery-time.component';
import { CustomRotatingProductImagesComponent } from './components/main/rotating-product-images/custom-rotating-product-images.component';
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

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: { primaryStrategy: 'native' },
    },
      {
        provide: COMPONENTS,
        useValue: {SimpleResponsiveBannerComponent: BannerBoxComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSTabParagraphContainer: CustomTabParagraphContainerComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductDetailsTabComponent: ProductDetailsTabComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {VerticalProductCarouselComponent: VerticalProductCarouselComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductReviewsTabComponent: CustomProductReviewsTabComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductVariantSelectorComponent: CustomProductVariantsComponent},
        multi: true
      },
      {
        provide:  COMPONENTS,
        useValue: {AddToWishListComponent: CustomAddToWishListComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductInstallmentsTabComponent: ProductInstallmentsTabComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {BrandLogosComponent: BrandsCarouselComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {StockNotificationComponent: CustomStockNotificationComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {FooterNavigationComponent: FooterNavigationComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {RotatingProductImagesComponent: CustomRotatingProductImagesComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductOutOfStockAlternativeComponent: OutOfStockAlternativeComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductImagesComponent: CustomProductImagesComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductDetailCampaignCardsComponent: ProductDetailCampaignCardsComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductAddToCartComponent: CustomAddToCartComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductSummaryComponent: CustomProductSummaryComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductIntroComponent: CustomProductIntroComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {DeliveryTimeParagraphComponent: CustomDeliveryTimeComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {DeliveryRegionParagraphComponent: CustomDeliveryRegionComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CategoryNavigationComponent: CustomCategoryNavigationComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSParagraphComponentStyleTwo: MagazaParagraphComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {SimpleResponsiveBannerBoxComponent: BannerBoxComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {BannerComponent: CustomBannerComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {SimpleBannerComponent: CustomSimpleBannerComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSComponentContainer: ComponentContainerComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {RotatingImagesComponent: CustomBannerCarouselComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSParagraphComponentStyleOne: MarketParagraphComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {MiniCartComponent: CustomMiniCartComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {HeaderLoginComponent: HeaderLoginComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {SearchBoxComponent: CustomSearchBoxComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSParagraphComponent: ParagraphComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {CMSTabParagraphComponent: ParagraphComponent},
        multi: true
      },
      {
        provide: COMPONENTS,
        useValue: {ProductCarouselComponent: CustomProductCarouselComponent},
        multi: true
      },

  ],
};

export const serverAppConfig = mergeApplicationConfig(appConfig, serverConfig);
