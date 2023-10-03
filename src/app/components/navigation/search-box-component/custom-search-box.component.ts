
import { CommonModule } from '@angular/common';
import {
  Component,
  Optional,
  OnInit,
  ViewChild,
  ElementRef,
  Inject, PLATFORM_ID, ChangeDetectionStrategy
} from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { CmsService } from 'src/app/cms.service';



@Component({
  selector: 'ozd-custom-search-box',
  templateUrl: './custom-search-box.component.html',
  styleUrls: ['./custom-search-box.component.scss'],
  standalone:true,
  imports:[RouterModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSearchBoxComponent implements OnInit {
  status: boolean = false;
  recentSearch: string[] = [];
  brands: any = [];
  /**
   * Sets the search box input field
   */

  /**
   * In some occasions we need to ignore the close event,
   * for example when we click inside the search result section.
   */
  private ignoreCloseEvent = false;
  /**
   * The component data is optional, so that this component
   * can be reused without CMS integration.
   */

  isMarket: boolean;
  increment: boolean;
  quantity = 1;
  scrollKey: string = '_page-detail-scroll-position';
  searchResults: boolean = true;
  searchSub: boolean = false;


  @ViewChild('focusFake', {static: true}) focusFake: ElementRef;



  constructor(
    @Optional()
    private router: Router,
    @Inject(PLATFORM_ID) protected platformId: any,
    private cms: CmsService,
  ) {

  }


  /**
   * Returns the backend configuration or default configuration for the searchbox.
   */

  ngOnInit(): void {
  }

  getRecent() {
  }





  /**
   * Closes the searchbox and opens the search result page.
   */

  /**
   */
  // Focus on previous item in results list

  // Focus on next item in results list

  /**
   * Opens the PLP with the given query.
   *
   * TODO: if there's a single product match, we could open the PDP.
   */

  /**
   * Disables closing the search result list.
   */
   disableClose(): void {
    this.ignoreCloseEvent = true;
  }
  /**
   * Clears the search box input field
   */


}
