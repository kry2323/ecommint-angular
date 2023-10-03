import {ChangeDetectionStrategy, Component, ElementRef, Input, isDevMode, OnInit, TemplateRef,} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CarouselService} from '@spartacus/storefront';

@Component({
  selector: 'ozd-vertical-carousel',
  templateUrl: './vertical-carousel.component.html',
  styleUrls: ['./vertical-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalCarouselComponent implements OnInit {

    @Input() title: string;

    items: Observable<any>[];
    @Input('items')
    set setItems(inputItems: Observable<any>[]) {
        this.items = inputItems;
        //Reset slider when changing products
        this.activeSlide = 0;
    }

    @Input() template: TemplateRef<any>;


    @Input() itemWidth = '124px';

    activeSlide: number;
    size$: Observable<number>;

    constructor(protected el: ElementRef, protected service: CarouselService) {}

    ngOnInit() {
        if (!this.template && isDevMode()) {
            console.error(
                'No template reference provided to render the carousel items for the `cx-carousel`'
            );
            return;
        }
        this.size$ = this.service
            .getItemsPerSlide(this.el.nativeElement, this.itemWidth)
            .pipe(tap(() => (this.activeSlide = 0)));
    }

}
