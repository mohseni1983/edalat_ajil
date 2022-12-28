import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { WebsiteProductEntity } from "./entities/website-product.entity";
import { ILike, Repository } from "typeorm";

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(WebsiteProductEntity) private readonly websiteProductsRepo:Repository<WebsiteProductEntity>
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
    product.retailPrice=newPrice
    product.wholesalePrice=newPrice
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
    return await this.websiteProductsRepo.save(websiteProduct)
  }
}
