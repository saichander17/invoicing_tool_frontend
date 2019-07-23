import {Deserializable} from "./deserializable.model";
export class Invoice implements Deserializable{
  // Each of customer_info, product info, pricing would ideally have separate classes
  // But here, we are just dealing with the invoices. So, not creating those classes
  customer_info: Object;
  product_info: Array<Object>;
  pricing: Object;
  invoice_path: string;
  created_at: string;
  deserialize(input: any){
    Object.assign(this, input);
    return this;
  }
  // getCustomerInfo(){
  //   return this.customer_info;
  // }
  // getProductInfo(){
  //   return this.product_info;
  // }
  // getPricing(){
  //   return this.pricing;
  // }
  // getInvoicePath(){
  //   return this.invoice_path;
  // }

  // setCustomerInfo(input: Object){
  //   let allowed_keys = ["name", "email", "phone"]
  //   if(Object.keys(input).filter(value => allowed_keys.includes(value)) != allowed_keys){
  //     throw "Invalid arguments provided for invoice customer info"
  //   }
  //   this.customer_info = input;
  // }

  // setProductInfo(input: Array<Object>){
  //   // let allowed_keys = ["name", "email", "phone"]
  //   // if(Object.keys(input).filter(value => allowed_keys.includes(value)) != allowed_keys){
  //   //   throw "Invalid arguments provided for invoice customer info"
  //   // }
  //   // Validate the keys in all objects of the array
  //   this.product_info = input;
  // }

  // appendProductInfo(input: Object){
  //   // Validate the keys
  //   this.product_info.push(input)
  // }

  // setPricing(){}



  // getNumberOfProducts(){
  //   return this.product_info.length;
  // }
}
