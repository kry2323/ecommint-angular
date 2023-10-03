import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import {ComponentDataService} from "../../component-data.service";
import {LetDirective} from "@rx-angular/template/let";

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LetDirective
  ],
  standalone: true
})
export class ParagraphComponent {
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const href = element?.getAttribute('href');

      const documentHost =
        element.ownerDocument.URL.split('://')[1].split('/')[0];

      // Use router for internal link navigation
      if (href && documentHost === element.host) {
        event.preventDefault();
        this.router.navigateByUrl(href);
      }
    }
  }
  data$ =     this.dataService.getData()
  constructor(
    private dataService: ComponentDataService,
    protected router: Router
  ) {}
}
