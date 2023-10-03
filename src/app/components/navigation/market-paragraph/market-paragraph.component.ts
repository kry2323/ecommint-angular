import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ozd-market-paragraph',
  templateUrl: './market-paragraph.component.html',
  styleUrls: ['./market-paragraph.component.scss'],
  standalone:true,
  imports:[CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketParagraphComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  onSetStore(store: string): void {
  }

}
