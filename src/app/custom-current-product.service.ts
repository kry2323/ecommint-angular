import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, filter, map, merge, of, switchMap, shareReplay, catchError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CmsService } from './cms.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomCurrentProductService  {
  private cachedProducts: Map<string, Observable<any>> = new Map();

  constructor(
    private http:HttpClient,
    private cmsService:CmsService,
  ) {
  }

  getProduct(): Observable<any > {
    const url = `https://api.ozdilekteyim.com/rest/v2/market-eskisehir-store/products/${this.cmsService.pageUrl}?fields=code,name,customUrl,summary,price(formattedValue),badges,images(DEFAULT,galleryIndex),FULL&lang=tr&curr=TRY`;

    // Eğer bu URL için bir önbellek zaten varsa, bu önbelleği kullan
    if (this.cachedProducts.has(url)) {
      return this.cachedProducts.get(url);
    }

    // Yoksa yeni bir istek oluştur ve sonucu önbelleğe al
    const product$ = this.http.get(url).pipe(
      shareReplay(1),
      catchError(error => {
        // Hata oluşursa önbelleği temizle
        this.cachedProducts.delete(url);
        throw error;
      })
    );

    this.cachedProducts.set(url, product$);
    return product$;
  }
}
