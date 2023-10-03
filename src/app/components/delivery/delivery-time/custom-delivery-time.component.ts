import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ComponentDataService } from 'src/app/component-data.service';

@Component({
  selector: 'ozd-custom-delivery-time',
  templateUrl: './custom-delivery-time.component.html',
  styleUrls: ['./custom-delivery-time.component.scss'],
  standalone:true,
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDeliveryTimeComponent implements OnInit {

  content$;
  showTimeslot: boolean = true;

  constructor(
    private http: HttpClient,
    private dataService:ComponentDataService
  ) { }
    private componentData$: any = this.dataService.getData()

  ngOnInit() {

  }

  getDateOfSlot(dateOfSlot: string){
    const items = dateOfSlot.split(' ').join('</span><span>');
    return `<span>${items}</span>`;
  }
}
