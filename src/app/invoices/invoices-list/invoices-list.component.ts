import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceService } from '../invoices.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
  // providers: [InvoiceService],
})
export class InvoicesListComponent {
  // @Input('selectedInvoiceId') selectedInvoiceId:number;
  selectedInvoiceIdValue:number;

  @Output() selectedInvoiceIdChange: EventEmitter<number> = new EventEmitter();
  @Input()
  get selectedInvoiceId() {
    return this.selectedInvoiceIdValue;
  }
  set selectedInvoiceId(val) {
    this.selectedInvoiceIdValue = val;
    this.selectedInvoiceIdChange.emit(this.selectedInvoiceIdValue);
    // this.setInvoice(this.selectedInvoiceIdValue);
  }

  public invoices:Array<Invoice>;
  private invoicesListOpened:boolean = true;
  constructor(private invoiceService:InvoiceService) {
    this.getInvoices();
    // this.invoices = [
    //   {id: 1, numberOfItems: 5, userName: "Sai", date: "13 Jun 1981", time: "11:35 AM", totalAmount: 2000, currency: "Rs."}, 
    //   {id: 2, numberOfItems: 3, userName: "Chander", date: "13 Jun 2009", time: "12:35 AM", totalAmount: 3600.75, currency: "USD."}
    // ];
  }
  getInvoices(){
    let self = this;
    this.invoiceService.getInvoices().subscribe(function(response){
      self.invoices = response.data.map((inv: Invoice) => new Invoice().deserialize(inv));
    },
    function(error){
      // self.dataLoading += 1;
      // self.errorMessage = <any>error;
    });
  }
}