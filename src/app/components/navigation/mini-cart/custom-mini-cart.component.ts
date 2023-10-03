import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {filter, map, tap } from 'rxjs/operators';
import {Observable } from 'rxjs';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ozd-custom-mini-cart',
  templateUrl: './custom-mini-cart.component.html',
  styleUrls: ['./custom-mini-cart.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
  standalone:true,
  imports:[RouterModule,CommonModule]
})
export class CustomMiniCartComponent implements OnInit, AfterViewChecked {
  status = false;
 
  isParentOrder$: Observable<boolean>;
  everyPickup: boolean = false;

  constructor(
    private _eref: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  clickEvent() {
    this.status = !this.status;
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.status = false;
    }
  }
  
  getImageUrl(images): string {
    if (images instanceof Array) {
      return images.find(x => x.format === 'thumbnail')?.url;
    }
    return images && images.PRIMARY && images.PRIMARY['thumbnail'] && images.PRIMARY['thumbnail']?.url ? images.PRIMARY['thumbnail'].url : null;
  }

  toLocaleString(value, seperator): string {
    return value.toFixed(2).replace((seperator !== '.' ? '.' : ' '), ',');
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
