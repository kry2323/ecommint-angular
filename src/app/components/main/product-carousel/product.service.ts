import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
  ) {}

  getCarouselProductsByIds(productIds):Observable<any>{
    const params = new HttpParams()
    .set('productIds',productIds)
    .set('lang', 'tr')
    .set('pageSize', '20')
    .set('curr', 'TRY');

  return this.http.get('https://api.ozdilekteyim.com/rest/v2/market-eskisehir-store/products/carousel', { params });
  }
}
