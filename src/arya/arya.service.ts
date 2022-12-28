import { Inject, Injectable } from "@nestjs/common";
import { SoapService } from "nestjs-soap/dist/soap.service";
import { Client } from "nestjs-soap";

@Injectable()
export class AryaService {
  constructor(
    @Inject('ARYA_CLIENT') private readonly client:Client
  ) {
/*
    console.log(process.env.ARYA_CREDENTIAL)
    this.getProducts('$ngi^40*vws').then(
      res=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
*/
  }

   getProducts(token:string){
      return  new Promise((resolve, reject)=>{
        this.client.GetGoodInfo({credentials:token},(error,result)=>{
          if(error) {
            reject(error);
          }
          if(!result.GetGoodInfoResult.success) {
            reject(result.GetGoodInfoResult.userResult);
          }
          resolve(JSON.parse(result.GetGoodInfoResult.jsonResult))
        });
      },)
  }
}
