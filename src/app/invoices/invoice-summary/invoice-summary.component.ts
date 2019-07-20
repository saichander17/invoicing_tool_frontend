import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent {
  @Input() invoiceId:number;
  private invoice:Object;
  ngOnInit(){
    this.invoice = this.getInvoiceDetails(this.invoiceId);
  }
  getInvoiceDetails(invoiceId:number){
    let allInvoices = {
      1: {id: 1, numberOfItems: 5, userName: "Sai", date: "13 Jun 1981", time: "11:35 AM", totalAmount: 2000, currency: "Rs.", products: [{name: "aksjdh", totalAmount: 1800, pricePerUnit: 600, quantity: 3}, {name: "cajsdhkj", totalAmount: 2400, pricePerUnit: 600, quantity: 4}], subtotal: 1500, discountPercent: 10, discount: 150, taxPercent: 20, tax: 300}, 
      2: {id: 2, numberOfItems: 3, userName: "Chander", date: "13 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "USD.", products: [{name: "Akjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 1600, pricePerUnit: 400, quantity: 4}]},
      3: {id: 3, numberOfItems: 1, userName: "Chander", date: "12 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "RS.", products: [{name: "Bkjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 2000, pricePerUnit: 400, quantity: 5}]},
      4: {id: 4, numberOfItems: 15, userName: "Chander", date: "12 Jun 2009", time: "12:35 AM", totalAmount: 32600.75, currency: "RS.", products: [{name: "Ckjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 2400, pricePerUnit: 400, quantity: 6}]}
    }
    return allInvoices[invoiceId];
  }
}