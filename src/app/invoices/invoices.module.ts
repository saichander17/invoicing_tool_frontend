import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar';
// import { AppRoutingModule } from './app-routing.module';
import { InvoicesComponent } from './invoices.component';
import { invoicesRouting } from './invoices.routing';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceShortSummaryComponent } from './invoice-short-summary/invoice-short-summary.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { PopupComponent } from '../popup/popup.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { InvoiceService } from './invoices.service';


@NgModule({
  declarations: [
    InvoicesComponent, InvoicesListComponent, InvoiceShortSummaryComponent, InvoiceSummaryComponent, PopupComponent,
    NewInvoiceComponent, UploadInvoiceComponent
  ],
  imports: [
    BrowserModule, invoicesRouting, SidebarModule.forRoot(), FormsModule, FontAwesomeModule
  ],
  providers: []
})
export class InvoicesModule { }
