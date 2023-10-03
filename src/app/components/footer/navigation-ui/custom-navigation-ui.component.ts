import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { LetDirective } from '@rx-angular/template/let';
import {Observable, of, Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { CmsNavigationNode } from 'src/app/model/cms.model';
import { GenericLinkComponent } from '../../generic-link';

@Component({
  selector: 'ozd-navigation-ui',
  templateUrl: './custom-navigation-ui.component.html',
  styleUrls:['./custom-navigation-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[RxFor,LetDirective,CommonModule,RouterModule,GenericLinkComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomNavigationUIComponent implements OnInit {
  /**
   * The navigation node to render.
   */
  @Input() node: any;

  /**
   * The number of child nodes that must be wrapped.
   */
  @Input() wrapAfter: number;
  @Input() allowAlignToRight = false;

  /**
   * the icon type that will be used for navigation nodes
   * with children.
   */
  user$: Observable<any>;
  loading$ = new Subject<boolean>();

  /**
   * Indicates whether the navigation should support flyout.
   * If flyout is set to true, the
   * nested child navitation nodes will only appear on hover or focus.
   */
  @Input() @HostBinding('class.flyout') flyout = true;

  @Input() @HostBinding('class.is-open') isOpen = false;

  constructor(
    private customRouter: Router,
    private customRenderer: Renderer2,
    private customElemRef: ElementRef,
) {
  }

  ngOnInit(): void {
  }

  getDepth(node: CmsNavigationNode, depth = 0): number {
    if (node.children && node.children.length > 0) {
      return Math.max(...node.children.map((n) => this.getDepth(n, depth + 1)));
    } else {
      return depth;
    }
  }
}
