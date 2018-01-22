import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { 
  Component, 
  OnInit, 
  Input,
  Output,
  SimpleChanges,  
  OnChanges,
  NgModule,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { OptionValue } from './../commons/helper.class';

import { TimesPipe } from './../pipes/times/times.pipe';

@Component({
  selector: 'aw-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges {

  pagesTotal: number;
  
  @Input() currentPage = 1;
  @Input() itemsTotal: number;
  @Input() itemsPerPage = 5;
  @Input() itemPerPageValues = [
    { value: 5, text: '5'},
    { value: 10, text: '10'},
    { value: 20, text: '20'},
    { value: 30, text: '30'},
    { value: 40, text: '50'},
    { value: 40, text: '70'},
    { value: 40, text: '100'}
  ];
  
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() first = new EventEmitter();
  @Output() last = new EventEmitter();
  @Output() itemPerPageChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
    
  ngOnChanges(changes: SimpleChanges): void {
      this.pagesTotal = Math.ceil(this.itemsTotal / this.itemsPerPage);
  }

  onPrev() {
    if (this.isFirst()) return;
    this.currentPage--;
    this.prev.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

  onNext() {
    if (this.isLast()) return;
    this.currentPage++;
    this.next.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

  isFirst(): boolean {
    return this.currentPage === 1 ? true : false;
  }

  isLast(): boolean {
    return this.currentPage === this.pagesTotal ? true : false;
  }

  onFirst() {
    this.currentPage = 1;
    this.first.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

  onLast() {
    this.currentPage = this.pagesTotal;
    this.last.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

  onItemsPerPageChange($event) {
    this.currentPage = 1;
    this.itemsPerPage = $event.target.value;
    this.itemPerPageChanged.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

  onGoToPageChange($event) {
    this.itemPerPageChanged.emit({ itemsPerPage: this.itemsPerPage, currentPage: this.currentPage });
  }

}

@NgModule({
    imports: [ CommonModule, FormsModule ],
    exports: [PaginationComponent],
    declarations: [PaginationComponent, TimesPipe]
})
export class PaginationModule { }
