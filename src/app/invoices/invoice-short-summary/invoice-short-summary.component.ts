import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
@Component({
  selector: 'invoice-short-summary',
  templateUrl: './invoice-short-summary.component.html',
  styleUrls: ['./invoice-short-summary.component.scss']
})
export class InvoiceShortSummaryComponent {
  @Input('invoice') invoice:Invoice;
  constructor() {}
}