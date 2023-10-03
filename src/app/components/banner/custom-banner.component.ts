import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ComponentDataService} from 'src/app/component-data.service';
import {MediaModule} from '../media';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LetDirective} from '@rx-angular/template/let';
import {GenericLinkComponent} from '../generic-link';

@Component({
  selector: 'ozd-banner',
  templateUrl: './custom-banner.component.html',
  styleUrls: ['./custom-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MediaModule, CommonModule, RouterModule, LetDirective, GenericLinkComponent]
})
export class CustomBannerComponent {
  constructor(private dataService: ComponentDataService) {
  }

  data$ = this.dataService.getData()
}
