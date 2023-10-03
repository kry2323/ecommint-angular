import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withDisabledInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { RxActionFactory } from '@rx-angular/state/actions';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import {provideHttpClient} from "@angular/common/http";
import { ROUTES } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideRouter(
      ROUTES,
      // withDebugTracing(),
      /**
       * **🚀 Perf Tip for TBT:**
       *
       * Disable initial sync navigation in router config and schedule it in router-outlet container component
       */
      withDisabledInitialNavigation(),
      withInMemoryScrolling({
        /**
         * **💡 UX Tip for InfiniteScroll:**
         *
         * Reset scroll position to top on route change, users could be
         * irritated starting a new list from the bottom of the page.
         *
         * also: otherwise infinite scroll isn't working properly
         */
        scrollPositionRestoration: 'top',
      })
    ),
    RxActionFactory,
    /**
     * **🚀 Perf Tip for LCP, TTI:**
     *
     * Fetch data visible in viewport on app bootstrap instead of component initialization.
     */
   // withGobalStateInitializer(),
    /**
     * **🚀 Perf Tip for TBT:**
     *
     * Chunk app bootstrap over APP_INITIALIZER.
     */
    {
      provide: APP_INITIALIZER,
      useFactory: () => (): Promise<void> =>
        new Promise<void>((resolve) => {
          setTimeout(() => resolve());
        }),
      deps: [],
      multi: true,
    },
    /**
     * **🚀 Perf Tip for TBT, LCP, CLS:**
     *
     * Configure RxAngular to get maximum performance.
     */
    {
      provide: RX_RENDER_STRATEGIES_CONFIG,
      useValue: { patchZone: false },
    },
  ],
};
