import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { InvoicesComponent } from './invoices.component';
const invoicesRoutes: Routes = [
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'invoices/:invoiceId',
    component: InvoicesComponent
  }
];

export const invoicesRouting: ModuleWithProviders = RouterModule.forChild(invoicesRoutes);