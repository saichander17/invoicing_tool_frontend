import { Component } from '@angular/core';

@Component({
  selector: 'upload-invoice-popup',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent {
  private fileData:Array<string>;
  private viewSection:string = 'file_upload';
  nextStep(){
    this.viewSection='dataTable';
  }
  upload(){}
  onFileChange(event) {
    let self = this;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let regex = /^([a-zA-Z0-9\s_\\.\-:\(\)])+(.csv|.xlsx|.xls)$/;
      if (!regex.test(event.target.value.toLowerCase())) {
        alert("Please upload file which is one of csv/xlsx/xls");
        self.clearFile(event);
      }
      let file = event.target.files[0];
      if(file.size>52428800){
        alert("Please upload file which is less than 50MB");
        self.clearFile(event);
      }
      reader.readAsText(file);
      reader.onload = () => {
        self.fileData = reader.result.split("\n");
        // this.viewSection='dataTable';
      };
    }
  }

  clearFile(event){
    event.target.value = null;
    this.fileData = null;
  }
}