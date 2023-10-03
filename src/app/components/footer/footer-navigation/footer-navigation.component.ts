import {CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { LetDirective } from '@rx-angular/template/let';
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import { ComponentDataService } from 'src/app/component-data.service';
import { GenericLinkComponent } from '../../generic-link';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomNavigationUIComponent } from '../navigation-ui/custom-navigation-ui.component';
import { PushPipe } from '@rx-angular/template/push';

@Component({
  selector: 'ozd-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:true,
    imports:[LetDirective,RxFor,GenericLinkComponent,CommonModule,RouterModule,CustomNavigationUIComponent,PushPipe],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterNavigationComponent {

    node$: Observable<any> = this.componentData.getData().pipe(
        map(response=>response.navigationNode.children)
    );


    constructor(
        private componentData:ComponentDataService
    )
   {
   }
}
