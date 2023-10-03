import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Params, Router, RouterLink} from '@angular/router';
import {CommonModule, NgTemplateOutlet} from "@angular/common";

interface RouteParts {
  path?: string[];
  queryParams?: Params | null;
  fragment?: string | null;
}

@Component({
  selector: 'ozd-generic-link',
  templateUrl: './generic-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    CommonModule,
    NgTemplateOutlet
  ],
  standalone: true,
})
export class GenericLinkComponent implements OnChanges {
  constructor(protected router: Router) {
  }

  private readonly PROTOCOL_REGEX: RegExp = /^https?:\/\//i;
  private readonly URL_SPLIT = /(^[^#?]*)(.*)/;
  private routeParts: RouteParts = {};

  @Input() url: string | any[];
  @Input() target: string;
  @Input() id: string;
  @Input() class: string;
  @Input() style: string;
  @Input() title: string;
  @Output() linkClick = new EventEmitter();

  isExternalUrl(): boolean {
    return typeof this.url === 'string' && this.PROTOCOL_REGEX.test(this.url);
  }

  get rel() {
    return this.target === '_blank' ? 'noopener' : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      this.setUrlParts(changes['url'].currentValue);
    }
  }

  get routerUrl(): string[] | undefined {
    return this.routeParts.path;
  }

  get queryParams(): Params  | null  {
    return this.routeParts.queryParams ?? null;
  }

  get fragment(): string  {
    return this.routeParts.fragment ?? '';
  }

  private setUrlParts(url: string | any[]) {
    if (typeof url === 'string') {
      url = this.getAbsoluteUrl(url); // string links in CMS sometimes don't have the leading slash, so fix it here
      this.routeParts = this.splitUrl(url as string);
    } else {
      this.routeParts = {path: url};
    }
  }

  private splitUrl(url: string = ''): RouteParts {
    const {queryParams, fragment} = this.router.parseUrl(url);
    const [, path] = url.match(this.URL_SPLIT);

    return {path: [path], queryParams, fragment};
  }

  private getAbsoluteUrl(url: string): string {
    return url.startsWith('/') ? url : '/' + url;
  }
}
