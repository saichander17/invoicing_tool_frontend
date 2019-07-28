import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams,Headers, RequestOptions} from '@angular/http';
// import { Http, ConnectionBackend, Headers, Request, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import { Observable, throwError }     from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Invoice } from '../models/invoice.model';
// import * as CryptoJS from 'crypto-js';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  private apiUrl = "https://invoicingtoolbackendapp.herokuapp.com/"
  // private apiUrl = "http://localhost:8000/"
  private baseUrl = "invoicingtool/invoices";
  private secret_key;
  // private secret_key = "9864079b7f0eb89612e9d4e8e8539a1b";
  private encrypted_secret_key;
  private server_public_key = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC776Kp7Prd54lBkSe0rcTSsq+9\nbHaa8l+X8kldXXtCTi6sed5TNCnuaD+7FZzwWVuV44i7aMLD+ynE7n5F9+QWumLZ\n0y19Y4qzTYKmFCyDXUbHSZggavFbYgxkD8p+dGxmsExZJRAuMEnw46CwQJW4MAu6\n8sch6gERvD5GsuCRUQIDAQAB\n-----END PUBLIC KEY-----';
  private self = this;
  constructor (private http:Http){
    // debugger;
    var salt = CryptoJS.lib.WordArray.random(128/8);
    var passphrase = Math.random().toString(36).substr(2, 20)
    for(this.secret_key = ''; this.secret_key.length < 32;) this.secret_key += Math.random().toString(36).substr(2, 1);
    // this.secret_key = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512/32 });
    var crypt = new JSEncrypt();
    crypt.setPublicKey(this.server_public_key);
    this.encrypted_secret_key = crypt.encrypt(this.secret_key);
    // var key128Bits = CryptoJS.PBKDF2(passphrase, salt, { keySize: 128/32 });
    // var key256Bits = CryptoJS.PBKDF2(passphrase, salt, { keySize: 256/32 });
    // var key512Bits = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512/32 });
    // var key512Bits1000Iterations = CryptoJS.PBKDF2(passphrase, salt, { keySize: 512/32, iterations: 1000 });
  }
  getInvoices(): Observable<any>{
    let url =  this.apiUrl +  this.baseUrl;
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('exam_id', this.exam_id);
    // params.set('test_category','full_test');
    let self = this;
    var myHeaders = {Authorization: this.encrypted_secret_key};
    let options = new RequestOptions({ headers: new Headers(myHeaders)});
    return this.http.get(url, options)
      .pipe(map(function(response){response["_body"] = self.decrypt(response["_body"]);let jsonResponse = response.json();return jsonResponse;}),
        catchError(this.handleError))
  }

  fetchInvoice(id): Observable<any>{
    let self = this;
    let url =  this.apiUrl +  this.baseUrl + "/"+ id;
    var myHeaders = {Authorization: this.encrypted_secret_key};
    let options = new RequestOptions({ headers: new Headers(myHeaders)});
    return this.http.get(url, options)
      .pipe(map(function(response){response["_body"] = self.decrypt(response["_body"]);let jsonResponse = response.json();return jsonResponse;}),catchError(this.handleError))
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
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, formData, options)
      .pipe(map(this.extractData),catchError(this.handleError))
  }

  checkFileStatus(id: number): Observable<any>{
    let self = this;
    let url =  this.apiUrl +  this.baseUrl + "/uploaded-files/"+ id;
    var myHeaders = {Authorization: this.encrypted_secret_key};
    let options = new RequestOptions({ headers: new Headers(myHeaders)});
    return this.http.get(url, options)
      .pipe(map(function(response){response["_body"] = self.decrypt(response["_body"]);let jsonResponse = response.json();return jsonResponse;}),catchError(this.handleError))
  }

  private extractData(response: Response){
    // debugger;
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
  private encrypt(message){
    var text = this.padOrTruncate(message);
    // padding and truncating
    // this.iv = CryptoJS.enc.Hex.parse("2811da22377d62fc");
    var iv = CryptoJS.enc.Latin1.parse("2811da22377d62fc");
    var key = CryptoJS.enc.Utf8.parse(this.secret_key);
    var encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    console.log(encrypted);

    var encrypted_text = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
    return encrypted_text;
  }

  private decrypt(encrypted_text){
    // debugger;
    // var rawData = CryptoJS.enc.Base64.parse(encrypted_text);
    // var iv = ciphertext.clone();
    // iv.sigBytes = 16;
    // iv.clamp();
    // ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    // ciphertext.sigBytes -= 16;
    // var key = CryptoJS.enc.Utf8.parse(this.secret_key);
    var rawData = atob(encrypted_text);
    var iv = rawData.substring(0, 16);
    var crypttext = rawData.substring(16);

    crypttext = CryptoJS.enc.Latin1.parse(crypttext);
    iv = CryptoJS.enc.Latin1.parse(iv);
    var key = CryptoJS.enc.Utf8.parse(this.secret_key);


    var decrypted = CryptoJS.AES.decrypt({ciphertext: crypttext}, key, {
                                          iv: iv,
                                          mode: CryptoJS.mode.CBC,
                                          padding: CryptoJS.pad.Pkcs7
                                        });
    // console.log(decrypted);
    // console.log(decrypted.toString());
    // console.log(decrypted.toString(CryptoJS.enc.Utf8));
    // console.log(CryptoJS.enc.Latin1.stringify(decrypted));
    return CryptoJS.enc.Latin1.stringify(decrypted);
  }

  private padOrTruncate(str: string) : string {
    var result: string = '';
    if( str.length % 16 == 0 )
      return str;

    result = str + '';
    while( !(result.length % 16 == 0) )
    {
      result = result + " ";
    }

    return result;
  }
}