import { CommonModule } from '@angular/common';
import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ozd-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
  standalone:true,
  imports:[RouterModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLoginComponent  {


    constructor() {}

}
