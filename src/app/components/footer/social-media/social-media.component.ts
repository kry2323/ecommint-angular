import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CmsService } from 'src/app/cms.service';

@Component({
  selector: 'ozd-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
  standalone:true,
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaComponent implements OnInit {

  componentUidList$: any;
  componentData$: any;

  constructor(private cmsService: CmsService) { }

  ngOnInit() {
      this.cmsService.getContentSlot('SocialMedia').subscribe(value => {
          this.componentUidList$ = value.components.map(data => data.uid);
      });
      if (this.componentUidList$.length > 1){
          for (let item of this.componentUidList$) {
              this.cmsService.getComponentData(item).subscribe(value => {
                  this.componentData$.push(value);
              });
          }
      }else if (this.componentUidList$.length == 1){
          this.cmsService.getComponentData(this.componentUidList$).subscribe(value => {
              this.componentData$ = value;
          }).unsubscribe();
      }
  }

}
