import { Component } from '@angular/core';

@Component({
  selector: 'new-invoice-popup',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent {
  private activeForm:string = 'product_pricing';
  private invoice:Object = {
      numberOfItems: 1, 
      userName: null,  
      totalAmount: 0, 
      currency: "Rs.", 
      products: [{}], 
      subtotal: 0, 
      discountPercent: 0, 
      discount: 0, 
      taxPercent: 0, 
      tax: 0
  };
  private addNewProduct(){
    this.invoice['products'].push({});
  }
  private calculateInvoiceTotals(){
    this.invoice['subtotal'] = 0;
    for(let product of this.invoice['products']){
      this.invoice['subtotal'] += (product.totalAmount || 0);
    }
    this.invoice['tax'] = (this.invoice['taxPercent']*this.invoice['subtotal'])/100.0;
    this.invoice['discount'] = (this.invoice['discountPercent']*this.invoice['subtotal'])/100.0;
    this.invoice['totalAmount'] = this.invoice['subtotal'] + this.invoice['tax'] - this.invoice['discount'];
    return this.invoice;
  }
}