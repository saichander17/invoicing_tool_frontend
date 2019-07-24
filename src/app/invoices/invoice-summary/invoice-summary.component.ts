import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InvoiceService } from '../invoices.service';
import {Router} from "@angular/router";
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss']
})
export class InvoiceSummaryComponent {
  invoiceIdValue:number;
  @Output() invoiceIdChange: EventEmitter<number> = new EventEmitter();
  @Input()
  get invoiceId() {
    return this.invoiceIdValue;
  }
  set invoiceId(val) {
    this.invoiceIdValue = val;
    this.invoiceIdChange.emit(this.invoiceIdValue);
    this.setInvoice(this.invoiceIdValue);
  }
  // @Input() invoiceId:number;
  // @Output() invoiceIdChange: EventEmitter<number> = new EventEmitter();
  public invoice:Invoice;
  constructor(private invoiceService:InvoiceService, private router: Router){}
  ngOnInit(){
    this.setInvoice(this.invoiceId);
  }
  setInvoice(invoiceId:number){
    let self = this;
    this.invoiceService.fetchInvoice(invoiceId).subscribe(function(response){
      if(!response.success){
        alert("No invoice exist with that ID");
        self.router.navigate(['/invoices']);
      }
      self.invoice = new Invoice().deserialize(response.data);
      // hard coding the currency temporarily. Until it is added in the backend
      self.invoice['currency'] = "Rs.";
    },
    function(error){
      alert("Some error with the show API");
      // self.dataLoading += 1;
      // self.errorMessage = <any>error;
    });
    // let allInvoices = {
    //   1: {id: 1, numberOfItems: 5, userName: "Sai", date: "13 Jun 1981", time: "11:35 AM", totalAmount: 2000, currency: "Rs.", products: [{name: "aksjdh", totalAmount: 1800, pricePerUnit: 600, quantity: 3}, {name: "cajsdhkj", totalAmount: 2400, pricePerUnit: 600, quantity: 4}], subtotal: 1500, discountPercent: 10, discount: 150, taxPercent: 20, tax: 300}, 
    //   2: {id: 2, numberOfItems: 3, userName: "Chander", date: "13 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "USD.", products: [{name: "Akjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 1600, pricePerUnit: 400, quantity: 4}]},
    //   3: {id: 3, numberOfItems: 1, userName: "Chander", date: "12 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "RS.", products: [{name: "Bkjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 2000, pricePerUnit: 400, quantity: 5}]},
    //   4: {id: 4, numberOfItems: 15, userName: "Chander", date: "12 Jun 2009", time: "12:35 AM", totalAmount: 32600.75, currency: "RS.", products: [{name: "Ckjashdkjasdjioasj jksahdkasd lkasjdlk", totalAmount: 2400, pricePerUnit: 400, quantity: 6}]}
    // }
    // return allInvoices[invoiceId];
  }
}