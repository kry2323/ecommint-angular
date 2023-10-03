import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LetDirective} from '@rx-angular/template/let';
import {RxFor} from '@rx-angular/template/for';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {CustomCurrentProductService} from 'src/app/custom-current-product.service';

@Component({
  selector: 'ozd-custom-product-reviews-tab',
  templateUrl: './custom-product-reviews-tab.component.html',
  styleUrls: ['./custom-product-reviews-tab.component.scss'],
  standalone:true,
  imports:[RouterModule,LetDirective,ReactiveFormsModule,RxFor,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomProductReviewsTabComponent implements OnInit {

  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  @ViewChild('writeReviewButton', { static: false }) writeReviewButton: ElementRef;


  isWritingReview = false;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems: number;
  reviewForm: FormGroup;
  product$: Observable<any> = this.currentProductService.getProduct();

  public isCollapsed = true;



  localKey = 'spartacus-product-detail-scroll';

  constructor(
    protected currentProductService: CustomCurrentProductService,
    private fb: FormBuilder,
    protected cd: ChangeDetectorRef,
  ) {}

// TODO:Spartacus - Method 'ngOnInit' is no longer called inside the 'StarRatingComponent'
  ngOnInit(): void {
    this.resetReviewForm();
  }

  initiateWriteReview(): void {
    this.isWritingReview = true;

    this.cd.detectChanges();
  }

  cancelWriteReview(): void {
    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  setRating(rating: number): void {
  }

  submitReview(product: any) {
    if (this.reviewForm.valid) {
      this.addReview(product);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  addReview(product: any): void {
    const reviewFormControls = this.reviewForm.controls;




    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  setCalcRating(rate:number, product :any){
  const getReviews: any[] = product.reviews?.filter(i=> i.rating === rate);
  let count  = 0;
  if(getReviews){
    count  = Object.keys(getReviews).length;}
    const reviews : number = product.numberOfReviews;
  if(reviews > 0 && count > 0 ){
    return  (100*count)/reviews;
  }
  return 0;
  }
  setCountRaiting(rate:number, product :any){
    const getReviews: any[] = product.reviews?.filter(i=> i.rating === rate);
    let count  = 0;
    if(getReviews){
      count  = Object.keys(getReviews).length || 0;
    }
    return count;
  }

  private resetReviewForm(): void {

  }
  goLogin(): void {

  }
}
