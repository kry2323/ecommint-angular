import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { LetDirective } from '@rx-angular/template/let';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { CmsService } from 'src/app/cms.service';
import { ComponentDataService } from 'src/app/component-data.service';
import { DynamicComponentDirective } from 'src/app/dynamic-component.directive';

@Component({
  selector: 'ozd-component-container',
  templateUrl: './component-container.component.html',
  styleUrls:['./component-container.component.scss'],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[CommonModule,DynamicComponentDirective,RxFor,LetDirective ]
})
export class ComponentContainerComponent
  implements OnInit {


  subscription: Subscription;
  data$ =     this.dataService.getData()
  constructor(
    private cmsService: CmsService,
    private dataService:ComponentDataService
  ) {}

 
  components$: any = this.data$.pipe(
    distinctUntilKeyChanged('components'),
    filter(data => !!data?.components),
    switchMap((data) =>{
      const componentsOrder = data.components.split(' ').join(','); // keep original order
      return this.cmsService.getComponentData(componentsOrder).pipe(
        distinctUntilChanged(),
        map(components=>components.component),
        map((components: any[]) => { // Sort components according to the original order
          return components.sort((a, b) => {
            return componentsOrder.indexOf(a.uid) - componentsOrder.indexOf(b.uid);
          });
        }),
      );
    })
  );

  ngOnInit(): void {
  
  }
}
