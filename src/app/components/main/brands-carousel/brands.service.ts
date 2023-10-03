import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(
    private http: HttpClient,
  ) {}

 
  getBrands():Observable<any>{
    return this.http.get('https://api.ozdilekteyim.com/rest/v2/magaza-magaza-store/categories/carousel/?componentId=MagazaHomePageBrandLogos&fields=FULL&lang=tr&curr=TRY');
  }
}
