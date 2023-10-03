import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomProductVariantGuard implements CanActivate {
  constructor(
    protected router: Router
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const productCode = activatedRoute.url.find(p => p.path)?.path;

    if (!productCode) {
      return of(true);
    }

  }


}
