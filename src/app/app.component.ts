import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ZonelessRouting} from "./shared/zone-less/zone-less-routing.service";
import {CmsService} from "./cms.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ecommint';
  template$ = this.cmsService.getTemplate()
  constructor(private  cmsService: CmsService,private route:Router,private active:ActivatedRoute) {
    inject(ZonelessRouting).init();
  }
}
