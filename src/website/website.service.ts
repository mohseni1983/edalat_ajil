import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { WebsiteProductEntity } from "./entities/website-product.entity";
import { ILike, Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(WebsiteProductEntity,'MYSQL') private readonly websiteProductsRepo:Repository<WebsiteProductEntity>
  ) {
/*
    websiteProductsRepo.find({where:{code: ILike('140111%')}}).then((res)=>{
      console.log(res.length)
    }).catch((err)=>{
      console.log(err)
    })
*/
  }

  async findProductAndUpdatePrice(productCode:string,newPrice:number){
    const product=await this.websiteProductsRepo.findOne({where:{code:productCode}})
    if(!product)
      return false
    product.retailPrice=newPrice/10
    product.wholesalePrice=newPrice/10
    await this.websiteProductsRepo.save(product);
    return true
  }

  async findAndUpdateMojodi(productCode:string,mojod:boolean){
    const product=await this.websiteProductsRepo.findOne({where:{code:productCode}})
    if(!product)
      return false
    mojod?product.statusId=1:product.statusId=3
    await this.websiteProductsRepo.save(product);
    return true;
  }

  async addNewProduct(websiteProduct:any){
    const existProduct=await this.websiteProductsRepo.findOne({where:{code:websiteProduct.code}})
    if(!existProduct){
       const prod=await this.websiteProductsRepo.save(websiteProduct)
      return true
    }
    return false;

  }

  async getAllAryaProducts(){
    return await this.websiteProductsRepo.find({where:{code: ILike('14011%')}})
  }

  async deleteAryaProduct(code:string){
    return await this.websiteProductsRepo.delete({code:code});
  }

  async deleteAllAryaProducts(){
    return await this.websiteProductsRepo.delete({code:ILike('14011%')});
  }


}
