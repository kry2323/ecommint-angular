import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavigationEnd, NavigationStart, Router, RouterModule} from '@angular/router';
import {debounceTime, filter, map} from 'rxjs/operators';
import { ComponentDataService } from 'src/app/component-data.service';
import { LetDirective } from '@rx-angular/template/let';
import { GenericLinkComponent } from '../../generic-link';
import { RxFor } from '@rx-angular/template/for';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ozd-category-navigation',
  templateUrl: './custom-category-navigation.component.html',
  styleUrls: ['./custom-category-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[LetDirective,GenericLinkComponent,RxFor,CommonModule,RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomCategoryNavigationComponent implements OnDestroy {

  @Input() wrapAfter: number;
  @Input() @HostBinding('class.flyout') flyout = true;

  @Input() @HostBinding('class.is-open') isOpen = false;

  private openNodes: HTMLElement[] = [];
  private subscriptions = new Subscription();
  private resize = new EventEmitter();

   node$ = this.componentData.getData().pipe(
    map(response => response.navigationNode.children)
  );

  constructor(
    protected componentData: ComponentDataService,
    private router: Router,
    private renderer: Renderer2,
    private elemRef: ElementRef  ) {
  }

  

  toggleOpen(event: any): void {
        if (event.type === 'keydown') {
          event.preventDefault();
        }
        const node = document.querySelector('.dropdown-menu-wrapper') as HTMLElement;
        if (this.openNodes.includes(node)) {
          if (event.type === 'keydown') {
            this.back();
          } else {
            this.openNodes = this.openNodes.filter((n) => n !== node);
            this.renderer.removeClass(node, 'opened');
          }
        } else {
          this.openNodes.push(node);
        }

        this.updateClasses();

        event.stopImmediatePropagation();
        event.stopPropagation();
  }

  back(): void {
    if (this.openNodes[this.openNodes.length - 1]) {
      this.renderer.removeClass(
        this.openNodes[this.openNodes.length - 1],
        'opened'
      );
      this.openNodes.pop();
      this.updateClasses();
    }
  }

  clear(): void {
    this.openNodes = [];
    this.updateClasses();
  }
  over(event:any){
    const element=event.target as HTMLElement;
    const wrapper = element.querySelector('.dropdown-menu-wrapper') as HTMLElement;
    if(!wrapper.classList.contains('opened')){
      wrapper.classList.remove('opened');
      document.body.classList.remove('nav-opened');
    }
  }

  onMouseEnter(event: MouseEvent) {
    this.alignWrapperToRightIfStickOut(event.currentTarget as HTMLElement);
    this.focusAfterPreviousClicked(event);
    document.querySelectorAll('.dropdown-menu-wrapper').forEach((el)=>{
      el.classList.remove('opened')
    })
    const element=event.currentTarget as HTMLElement;
    const wrapper = element.querySelector('.dropdown-menu-wrapper') as HTMLElement;
    wrapper?.classList.add('opened');
    document.body.classList.add('nav-opened');
   }


  onMouseEnter2(event: MouseEvent) {
    this.alignWrapperToRightIfStickOut(event.currentTarget as HTMLElement);
    this.focusAfterPreviousClicked(event);
    const element=event.currentTarget as HTMLElement;
    const wrapper = element.querySelector('.dropdown-menu-wrapper') as HTMLElement;
    wrapper?.classList.add('opened');
    document.body.classList.add('nav-opened');
   }

  getColumnCount(length: number): number {
    return Math.round(length / (this.wrapAfter || length));
  }

  focusAfterPreviousClicked(event: MouseEvent) {
    const target: HTMLElement = (
      (event.target || event.relatedTarget)
    ) as HTMLElement;
    if (
      target.ownerDocument.activeElement.matches('nav[tabindex]') &&
      target.parentElement.matches('.flyout')
    ) {
      target.focus();
    }
    return target.ownerDocument;
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }

  }

  private alignWrapperToRightIfStickOut(node: HTMLElement) {
    const wrapper = node.querySelector('.wrapper') as HTMLElement;
    const body = node.closest('body') as HTMLElement;
    if (wrapper) {
      this.renderer.removeStyle(wrapper, 'margin-left');
      if (
        wrapper.offsetLeft + wrapper.offsetWidth >
        body.offsetLeft + body.offsetWidth
      ) {
        this.renderer.setStyle(
          wrapper,
          'margin-left',
          `${node.offsetWidth - wrapper.offsetWidth}px`
        );
      }
    }
  }

  private alignWrappersToRightIfStickOut() {
    const navs = this.elemRef.nativeElement.childNodes as HTMLCollection;
    Array.from(navs)
      .filter((node) => node.tagName === 'NAV')
      .forEach((nav) => this.alignWrapperToRightIfStickOut(nav as HTMLElement));
  }

  private updateClasses(): void {
    this.openNodes.forEach((node, i) => {
      if (i + 1 < this.openNodes.length) {
        this.renderer.addClass(node, 'is-opened');
        this.renderer.removeClass(node, 'is-open');
      } else {
        this.renderer.removeClass(node, 'is-opened');
        this.renderer.addClass(node, 'is-open');
      }
    });

    this.isOpen = this.openNodes.length > 0;
  }



  goLink(url: string): void {
    this.router.navigateByUrl(url);
  }
}
