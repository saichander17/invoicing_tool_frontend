import { Component, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../invoices.service';

@Component({
  selector: 'new-invoice-popup',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent {
  @Output() hidePopUp: EventEmitter<any> = new EventEmitter();
  private activeForm:string = 'customer_details';
  private invoice:Invoice = new Invoice().deserialize({
    customer_info: {"name": null},
    product_info: [{}],
    pricing: {subtotal: 0, tax_percent: 0, discount_percent: 0, tax: 0, discount: 0, total_amount: 0},
  });
  constructor(private invoiceService:InvoiceService){}
  private addNewProduct(){
    this.invoice.product_info.push({});
  }
  private calculateInvoiceTotals(){
    this.invoice.pricing['subtotal'] = 0;
    for(let product of this.invoice['product_info']){
      this.invoice.pricing['subtotal'] += (product['amount'] || 0);
    }
    this.invoice.pricing['tax'] = (this.invoice.pricing['tax_percent']*this.invoice.pricing['subtotal'])/100.0;
    this.invoice.pricing['discount'] = (this.invoice.pricing['discount_percent']*this.invoice.pricing['subtotal'])/100.0;
    this.invoice.pricing['total_amount'] = this.invoice.pricing['subtotal'] + this.invoice.pricing['tax'] - this.invoice.pricing['discount'];
    return this.invoice;
  }
  private changeStep(step){
    this.activeForm = step;
    // this.activeForm = 'product_pricing';
  }
  private createInvoice(){
    let self = this;
    this.invoiceService.createInvoice(this.invoice).subscribe(function(response){
      alert("Invoice created successfully");
      self.activeForm = 'customer_details';
      self.removePopUp();
    },
    function(error){
      console.log(error);
      alert("Invoice couldn't be created. Please check the form once again");
      self.activeForm = 'customer_details';
      self.removePopUp();
      // self.dataLoading += 1;
      // self.errorMessage = <any>error;
    });
  }
  removePopUp(){
    this.hidePopUp.emit(false);  
  }
}