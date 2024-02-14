import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  /** Emits the selected page number */
  @Output() pageNumber = new EventEmitter<string>();

  /** Emits the selected page size */
  @Output() pagesizeData = new EventEmitter<string>();

  /** Current page number */
  @Input() page: number;

/** Total number of data items. (Can be set from outside of component) */
  @Input() totalData: number;

    /** Number of data items per page */
  @Input() pageSize: string;

  /** Total number of pages */
  totalPage: any;

  /** Array for managing pagination */
  ChangeArray: any[] = [];

  /** Array to store paginated page numbers */
  paginatedArray: any[] = [];

  /** Default configuration options for pagination page size. */
  pageSizeList: any[] = [
    { label : 100, value : '100'},
    { label : 250, value : '250'},
    { label : 500, value : '500'},
    { label : 1000, value : '1000'},
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    // Handle changes in input properties
    this.pageCount()
  }

  /**
   * Calculate the total number of pages based on total data items and page size.
   */
  pageCount() {
    this.totalPage = Math.round(Math.ceil(+this.totalData / +this.pageSize));

    if (Math.round(this.totalPage) <= 1) {
      this.ChangeArray = [];
      this.ChangeArray.push('1')
      this.paginatedArray = [];
      this.paginatedArray.push('1')
    } else {
      this.ChangeArray = [];
      this.paginatedArray = [];
      for (let i = 1; i <= this.totalPage; i++) {
        this.ChangeArray.push(i)
        this.paginatedArray.push(i)
      }
      this.changeArray(this.paginatedArray, this.page)
    }
  }

  /**
   * Generate an array for pagination based on the current page.
   * @param array - Array of page numbers
   * @param page - Current page number
   */
  changeArray(array, page) {
    let totalcount = array.length;
    let arr1 = []
    if (array.length >= 4) {
      arr1.push(1);
      if (page > 3) { arr1.push("...") }
      if (page == totalcount) { arr1.push(page - 2); }
      if (page > 2) { arr1.push(page - 1); }
      if (page != 1 && page != totalcount) { arr1.push(page); }
      if (page < totalcount - 1) { arr1.push(page + 1); }
      if (page == 1) { arr1.push(page + 2) }
      if (page < totalcount - 2) { arr1.push("...") }
      arr1.push(totalcount);
      this.ChangeArray = arr1;
    }
  }


  /**
    Handles clicking on the previous page button.
  */
  onPrevious() {
    const page = this.page - 1;
    this.onPaginationClick(page);
  }

  /**
    Handles clicking on the next page button.
  */
  onNext() {
    const page = this.page + 1;
    this.onPaginationClick(page);
  }

  /**
   * Handles clicking on a pagination link.
   * Emits the selected page number.
   * @param value - Selected page number
   */
  onPaginationClick(value) {
    if (value !== '...') {
      if(value == this.page){
        return;
      }
      this.changeArray(this.paginatedArray, value);
      this.pageNumber.emit(value);
    }
  }

  /**
   * Handles changing the page size.
   * Emits the selected page size.
   */
  onSelectPageLength() {
    this.pageSize = this.pageSize;
    this.pageCount()
    this.pagesizeData.emit(this.pageSize)
  }
}
