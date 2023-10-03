import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import { Image } from '../../../media/image.model';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@rx-angular/template/let';
import { CustomCurrentProductService } from 'src/app/custom-current-product.service';
declare let MagicZoom: any;
declare let mzOptions: any;
declare let mzMobileOptions: any;

@Component({
  selector: 'ozd-custom-product-images',
  templateUrl: './custom-product-images.component.html',
  styleUrls: ['./custom-product-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule,RouterModule,LetDirective]
})
export class CustomProductImagesComponent  {
  protected mainMediaContainer = new BehaviorSubject<any>(null);

  product$: Observable<any>=this.productService.getProduct();
  modalImage: string;
  defaultImage = 'assets/img/default.png';
  galleryId = 'zoom-product';
  mainZoomUrl: Image;

  thumbs$: Observable<any[]> = this.product$.pipe(
    map((p) => this.createThumbs(p))
  );  
  constructor(
    private cd: ChangeDetectorRef,
    private productService:CustomCurrentProductService,
    @Inject(PLATFORM_ID) private platform: any,
  ) {
  }


  runZoom() {
  }

  refreshZoom(value: any) {
    this.openImage(value);

    let zoom = value?.zoom;

    if (value?.superZoom) {
      zoom = value.superZoom;
    }

    MagicZoom.update(this.galleryId, zoom.url, value?.zoom.url);
  }

  openImage(item: any): void {
    this.mainMediaContainer.next(item);
  }

  imageLoaded($event: any) {
    setTimeout(() => {
      this.runZoom();
    }, 500);
  }

  setThumbnail(value: any) {
    return value?.thumbnail ? value.thumbnail : value?.product;
  }

  private createThumbs(product: any): Observable<any>[] {
    if (
      !product.images ||
      !product.images.GALLERY ||
      product.images.GALLERY.length < 2
    ) {
      return [];
    }

    return (<any[]> product.images.GALLERY).map((c) => of({ container: c }));
  }
}
