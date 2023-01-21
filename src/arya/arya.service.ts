import { AryaProductsDto } from './dto/arya-product.dto';
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

   getProducts(token:string):Promise<AryaProductsDto[]>{
      return  new Promise<AryaProductsDto[]>((resolve, reject)=>{
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
