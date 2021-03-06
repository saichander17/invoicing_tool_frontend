import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  constructor(private route: ActivatedRoute) {}
  public invoicesListSideBarOptions:Object = {open: true, mode: 'push'};
  public activeInvoiceId:number;
  public showUploadInvoicePopup:boolean = false;
  public showNewInvoicePopup:boolean = false;
  public smallScreen:boolean = false;
  faPlus = faPlus;
  faUpload = faUpload;
  ngOnInit(){
    // this.adjustInvoiceListSideBar();
    this.route.params.subscribe(params => {
       this.activeInvoiceId = params['invoiceId'];
       if(window.innerWidth<780){
         this.invoicesListSideBarOptions['open'] = false;
         this.smallScreen = true;
       }
    });
  }
  toggleInvoicesList(){
    this.invoicesListSideBarOptions['open'] = !this.invoicesListSideBarOptions['open'];
  }
  // adjustInvoiceListSideBar(){
  //   if(window.innerWidth<780){
  //     // mode should be changed to over and triggerRerender should be executed
  //     // this.invoicesListSideBarOptions['mode'] = 'slide';
  //     // this.invoiceListSideBar.triggerRerender();
  //   }
  // }
  openNewInvoicePopup(){
    this.showNewInvoicePopup = true;
  }
  showHideNewInvoicePopup(event){
    this.showNewInvoicePopup = false;
  }
  openUploadInvoicePopup(){
    this.showUploadInvoicePopup = true;
  }
  showHideUploadInvoicePopup($event){
    this.showUploadInvoicePopup = false;
  }
}