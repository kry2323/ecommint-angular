import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, filter, map, merge, of, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CmsService } from './cms.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService  {

  constructor(
    private http:HttpClient,
    private cmsService:CmsService,
  ) {
  }

  getComponents(): Observable<any > {
  return this.http.get(`https://api.ozdilekteyim.com/rest/v2/market-eskisehir-store/cms/components?fields=DEFAULT&productCode=${this.cmsService.pageUrl}&currentPage=0&pageSize=23&componentIds=sutfest-tk-kampanya%2Cevtekstili-kasa-kampanyasi-topheader%2Cexuma-mgz-kasa-kamp-topheader%2Cgemlik-tutar-kampanyasi%2C%C4%B1negol-tutar-kampanyasi%2Cyalova-tutar-kampanyasi%2Ckaplikaya-tutar-kampanyasi%2Ckocaeli-tutar-kampanyasi%2Ceskisehir-tutar-kampanyasi%2Cantalya-tutar-kampanyasi%2Cizmir-tutar-kampanyasi%2Cgd-mgz-topheader%2CProductDetailsTabComponent%2CProductInstallmentsTabComponent%2CMarketDeliveryTabComponent%2CProductReviewsTabComponent&lang=tr&curr=TRY`);
  }
}
