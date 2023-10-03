import { CommonModule, isPlatformBrowser } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import { CmsService } from 'src/app/cms.service';

@Component({
  selector: 'ozd-magaza-paragraph',
  templateUrl: './magaza-paragraph.component.html',
  styleUrls: ['./magaza-paragraph.component.scss'],
  standalone:true,
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagazaParagraphComponent implements OnInit, AfterViewInit {
  isMagaza: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    protected cmsService: CmsService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  storePopover() {
  }

  onSetStore(store: string): void {
  }

}
