import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {DynamicComponentDirective} from "../dynamic-component.directive";
import {BehaviorSubject, distinctUntilChanged, filter, Observable, tap} from "rxjs";
import {switchMap} from "rxjs/operators";
import {isNotNullable, isNotUndefined} from "../utils/type-guards";
import {CmsService} from "../cms.service";
import {RxFor} from "@rx-angular/template/for";
import {CommonModule} from "@angular/common";
import {LetDirective} from "@rx-angular/template/let";

@Component({
  selector: 'cx-page-slot',
  templateUrl: './page-slot.component.html',
  imports: [
    DynamicComponentDirective,
    CommonModule,
    RxFor,
    LetDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent {

  @HostBinding('attr.position')
  @Input()
  set position(value: string | undefined) {
    this.position$.next(value);
  }
  get position(): string | undefined {
    return this.position$.value;
  }

  protected position$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private cmsService: CmsService) {
  }

  protected slot$: Observable<any> = this.position$.pipe(
    filter(isNotUndefined),
    switchMap((position) => this.cmsService.getContentSlot(position)),
    filter(isNotNullable),
    distinctUntilChanged(this.isDistinct),
  );

  protected isDistinct(
    old: any,
    current: any
  ): boolean {
    return Boolean(
      current.components &&
      old.components &&
      old.components.length === current.components.length &&
      !old.components.component.find(
        (el: any, index:number) => el.uid !== current.components?.component[index].uid
      )
    );
  }
}
