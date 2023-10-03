import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MediaModule} from '../../media';
import {ComponentDataService} from 'src/app/component-data.service';
import {LetDirective} from "@rx-angular/template/let";

@Component({
  selector: 'ozd-custom-simple-banner',
  templateUrl: './custom-simple-banner.component.html',
  styleUrls: ['./custom-simple-banner.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MediaModule, LetDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSimpleBannerComponent {
  constructor(private dataService: ComponentDataService) {
  }

  data$ = this.dataService.getData()
}
