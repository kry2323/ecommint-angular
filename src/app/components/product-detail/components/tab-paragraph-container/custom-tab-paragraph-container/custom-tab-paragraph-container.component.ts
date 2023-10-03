import {ChangeDetectionStrategy, Component} from '@angular/core';
import { BehaviorSubject, Observable,  map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { DynamicComponentDirective } from 'src/app/dynamic-component.directive';
import { ParagraphService } from 'src/app/paragraph.service';
import { RxIf } from '@rx-angular/template/if';
import { PushPipe } from '@rx-angular/template/push';

@Component({
  selector: 'ozd-custom-tab-paragraph-container',
  templateUrl: './custom-tab-paragraph-container.component.html',
  styleUrls: ['./custom-tab-paragraph-container.component.scss'],
  standalone:true,
  imports:[CommonModule,LetDirective,RxFor,DynamicComponentDirective,RxIf,PushPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabParagraphContainerComponent{
 paragraphComponent$:Observable<any>=this.paragraphService.getComponents();
  activeTabNum:BehaviorSubject<number>=new BehaviorSubject<number>(0);

 component$ = this.paragraphComponent$.pipe(
   map(data => data.component.filter(data=>data.name))
 );

  componentsArray:any;
  constructor(
    public paragraphService:ParagraphService,

  ) {
  }
  selectComponent:any;
  select(tabNum: any){
    this.activeTabNum.next(tabNum)
  }

}
