import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, filter, map, Observable, of, shareReplay, startWith, tap} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {layoutConfig, SlotConfig} from "./layout.config";
import {isNotNullable} from "./utils/type-guards";
import {DOCUMENT} from "@angular/common";
import {fallbackRouteToDefault} from "./shared/router/router.state";


@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private cachedPages: Map<string, Observable<any>> = new Map();
  private readonly document = inject(DOCUMENT);
  pageResponse = new BehaviorSubject<any>(null)
  public pageUrl: string;

  constructor(private router: Router, private http: HttpClient
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith('homepage'),
      switchMap((x) => {
          const paths = fallbackRouteToDefault(
            new URL(
              this.document.location.href,
              /* On SSR pre-render the location data are relative paths instead of valid absolute URLs, that's why we need to construct a new URL, with explicit origin (substituted by mock if pre-rendering) and then only consume pathname as our routing location */
              this.document.location.origin || 'http://mock.domain'
            ).pathname
          )
            .split('/')
            .slice(-3);
          const baseStore = paths[1];
          let path = paths[2];

          let url = 'homepage'
          if (!path) {
            path = url
          }
          this.pageUrl = path

        if (this.cachedPages.has(path)) {
          return this.cachedPages.get(path);
        }

        // Eğer önbellekte bu sayfa için bir değer yoksa yeni bir istek yapalım
        const page$ = this.http.get(`https://api.ozdilekteyim.com/rest/v2/market-eskisehir-store/cms/pages/customUrl?fields=DEFAULT&customUrl=${path}&lang=tr&curr=TRY`).pipe(
          shareReplay(1),
          catchError(error => {
            // Hata oluşursa bu sayfa için önbelleği temizleyelim
            this.cachedPages.delete(path);
            throw error;
          })
        );

        // Sonucu önbelleğe alalım
        this.cachedPages.set(path, page$);
        return page$;
        }
      ),
      tap(response => {
        this.pageResponse.next(response)
      })
    ).subscribe();
  }

  getCurrentPage(): Observable<any> {
    return this.pageResponse.asObservable()
  }

  getComponentData(componentIds): Observable<any> {
    const params = new HttpParams()
      .set('fields', 'DEFAULT')
      .set('currentPage', '0')
      .set('pageSize', '72')
      .set('componentIds', componentIds)
      .set('lang', 'tr')
      .set('curr', 'TRY');

    return this.http.get('https://api.ozdilekteyim.com/rest/v2/market-eskisehir-store/cms/components', {params});
  }

  getTemplate() {
    return this.pageResponse.asObservable().pipe(filter(isNotNullable),
      map(page => page.template))
  }


  getContentSlot(position: string): Observable<any> {
    return this.pageResponse
      .asObservable()
      .pipe(
        filter(isNotNullable),
        map((page: any) => page?.contentSlots.contentSlot.filter((slot: any) => slot.position === position)),
        filter(isNotNullable),
        map(slots => slots[0]),
      );
  }

  getSlots(section: string): Observable<any> {
    return this.pageResponse
      .asObservable()
      .pipe(
        filter((page: any) => page?.contentSlots),
        map((page: any) => {
          // Filter the slots based on the layout configuration.
          let filteredSlots = page.contentSlots.contentSlot.filter((slot: any) => {
            if (layoutConfig.layoutSlots && layoutConfig.layoutSlots[section]) {
              return (layoutConfig.layoutSlots[section] as SlotConfig).slots?.includes(slot.position) && slot?.components?.component?.length > 0
            }
            return null;
          });
          // Sort the filtered slots based on the layout configuration.
          let sortedSlots = filteredSlots.sort((a: any, b: any) => {
            let slots = (layoutConfig.layoutSlots[section] as SlotConfig).slots;
            return slots.indexOf(a.position) - slots.indexOf(b.position);
          });
          return sortedSlots;
        }),
      );
  }
}
