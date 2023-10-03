import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {BehaviorSubject, Observable, of, take, tap} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {CmsService} from "../cms.service";
import {PageSlotComponent} from "../slot/page-slot.component";
import {RxFor} from "@rx-angular/template/for";
import {JsonPipe} from "@angular/common";
import {PushPipe} from "@rx-angular/template/push";

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageSlotComponent,
    RxFor,
    JsonPipe,
    PushPipe,
  ],
  standalone: true
})
export class PageLayoutComponent {
  @Input() set section(value: string) {
    this.section$.next(value);
  }

  readonly section$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private  cmsService: CmsService) {
  }


  readonly slots$: Observable<any> = this.section$.pipe(
    switchMap((section) => this.cmsService.getSlots(section ?? "")),
  );
}
