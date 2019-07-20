import { Component } from '@angular/core';

@Component({
  selector: 'invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {
  private invoices;
  private invoicesListOpened:boolean = true;
  constructor() {
    this.invoices = [
      {id: 1, numberOfItems: 5, userName: "Sai", date: "13 Jun 1981", time: "11:35 AM", totalAmount: 2000, currency: "Rs."}, 
      {id: 2, numberOfItems: 3, userName: "Chander", date: "13 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "USD."}
    ];
  }
}