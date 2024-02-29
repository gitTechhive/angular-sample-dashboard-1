import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
  }

  ngOnDestroy(): void {
    document.documentElement.removeAttribute('data-layout');
    document.documentElement.removeAttribute('data-sidebar-size');
  }

}
