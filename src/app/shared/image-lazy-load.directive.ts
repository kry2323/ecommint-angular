import {Directive, ElementRef, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformServer} from "@angular/common";

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class ImageLazyLoadDirective {
  private intersectionObserver: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }


    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target.classList.contains("load-lazy")) {
              this.renderer.setAttribute(target, 'src', target.dataset['src']);
              this.renderer.removeClass(target, 'load-lazy');
            }
            this.intersectionObserver.unobserve(target);
          }
        });
      }, {
        rootMargin: '25% 0px'
      });

      this.intersectionObserver.observe(this.el.nativeElement);
    } else {
      this.renderer.listen(window, 'scroll', () => {
        const rect = this.el.nativeElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          const target = this.el.nativeElement as HTMLElement;
          this.renderer.setAttribute(target, 'src', target.dataset['src']);
          this.renderer.removeClass(target, 'load-lazy');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
