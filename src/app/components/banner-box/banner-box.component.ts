import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {COMPONENTS} from "../../cms-token";
import {ComponentDataService} from "../../component-data.service";
import {tap} from "rxjs";
import {RouterLink} from "@angular/router";
import {LetDirective} from "@rx-angular/template/let";
import {CommonModule} from "@angular/common";
import {MediaModule} from "../media";

@Component({
  selector: 'ozd-banner-box',
  templateUrl: './banner-box.component.html',
  styleUrls: ['./banner-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    LetDirective,
    CommonModule,
    MediaModule,
  ],
  providers: [{
    provide: COMPONENTS,
    useValue: { SimpleResponsiveBannerBoxComponent: BannerBoxComponent},
  }]
})
export class BannerBoxComponent  {
  data$ =     this.dataService.getData()
  constructor(private dataService: ComponentDataService) { }
}
