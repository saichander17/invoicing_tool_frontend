import { Component, Output, EventEmitter } from '@angular/core';
import { InvoiceService } from '../invoices.service';
@Component({
  selector: 'upload-invoice-popup',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent {
  @Output() hidePopUp: EventEmitter<any> = new EventEmitter();
  private file:any;
  private fileId:number;
  private fileData:Array<string>;
  private fileStatus:Object = {};
  public viewSection:string = 'file_upload';
  private polling_interval_session:any;
  constructor(private invoiceService:InvoiceService){}
  // nextStep(){
  //   this.viewSection='dataTable';
  // }
  changeStep(step){
    this.viewSection=step;
  }
  upload(){
    let self = this;
    this.invoiceService.uploadInvoices(this.file).subscribe(function(response){
      if(response.success){
        self.fileId = response.file_id;
        self.changeStep('polling_screen');
        self.startPolling();
      }else{
        alert("File couldn't be uploaded. Please try again!");
        self.removePopUp();
      }
    },
    function(error){
      console.log(error);
      alert("Invoice couldn't be uploaded. Please check the file and try again");
      // self.removePopUp();
    });
  }
  startPolling(){
    let self = this;
    self.polling_interval_session = setInterval(function(){ self.checkFileStatus() }, 2000);
  }
  checkFileStatus(){
    let self = this;
    self.invoiceService.checkFileStatus(self.fileId).subscribe(function(response){
      if(response.success){
        self.fileStatus['status'] = response.data.status;
        self.fileStatus['percentProcessed'] = response.data.percentage_processed;
        if(self.fileStatus['status']=='success' || self.fileStatus['status']=='failure'){
          clearInterval(self.polling_interval_session);
        }
      }
    },
    function(error){
    });
  }
  onFileChange(event) {
    let self = this;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let regex = /^([a-zA-Z0-9\s_\\.\-:\(\)])+(.csv|.xlsx|.xls)$/;
      if (!regex.test(event.target.value.toLowerCase())) {
        alert("Please upload file which is one of csv/xlsx/xls");
        self.clearFile(event);
      }
      self.file = event.target.files[0];
      if(self.file['size']>52428800){
        alert("Please upload file which is less than 50MB");
        self.clearFile(event);
      }
      reader.readAsText(self.file);
      reader.onload = () => {
        self.fileData = reader.result.toString().split("\n");
        // this.viewSection='dataTable';
      };
    }
  }

  clearFile(event){
    event.target.value = null;
    this.fileData = null;
    this.file = null;
  }
  removePopUp(){
    this.hidePopUp.emit(false);  
  }
}