import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentDataService } from 'src/app/component-data.service';

@Component({
  selector: 'ozd-custom-delivery-region',
  templateUrl: './custom-delivery-region.component.html',
  styleUrls: ['./custom-delivery-region.component.scss'],
  standalone:true,
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDeliveryRegionComponent implements OnInit {


    deliveryCityList: any = [];
    deliveryCountyList: any = [];
    countyList: any = [];
    neighborhoodList: any = [];
    deliveryNeighborhoodList: any = [];
    cityName: string;
    countyName: string;
    neighborhoodName: string;
    valueText: string;
    isSubmit: boolean;
    currentWindowWidth: number;
    modalSubs: Subscription;
    langKey: string = 'delivery.region.titleMd';

    @ViewChild('content', { static: false }) private content;

    constructor(
      private dataService:ComponentDataService
    ) {
    }

    private componentData$: any =  this.dataService.getData()


    ngOnInit() {
  }


}
