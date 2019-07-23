import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams,Headers, RequestOptions} from '@angular/http';
// import { Http, ConnectionBackend, Headers, Request, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import { Observable, throwError }     from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Invoice } from '../models/invoice.model';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  private apiUrl = "http://localhost:8000/"
  private baseUrl =   "invoicingtool/invoices";
  constructor (private http:Http){}
  getInvoices(): Observable<any>{
    let url =  this.apiUrl +  this.baseUrl;
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('exam_id', this.exam_id);
    // params.set('test_category','full_test');
    return this.http.get(url)
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  fetchInvoice(id): Observable<any>{
    let url =  this.apiUrl +  this.baseUrl + "/"+ id;
    return this.http.get(url)
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  createInvoice(invoice: Invoice): Observable<any>{
    let url = this.apiUrl + this.baseUrl + "/create/";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, invoice, options)
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  uploadInvoices(file: File): Observable<any>{
    let url = this.apiUrl + this.baseUrl + "/upload/" + file.name;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {file: file})
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  checkFileStatus(id: number): Observable<any>{
    let url =  this.apiUrl +  this.baseUrl + "/uploaded-files/"+ id;
    return this.http.get(url)
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  private extractData(response: Response){
    let jsonResponse = response.json();
    return jsonResponse;  
  }

  private handleError (error: any) {
    // debugger
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return throwError(errMsg);
  }
}