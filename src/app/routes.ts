import { Routes } from '@angular/router';
import { PageLayoutComponent } from './page-layout/page-layout.component';
// import { RouteISRConfig } from 'ngx-isr';

export const ROUTES: Routes = [
{ path: '**', component: PageLayoutComponent },
];
