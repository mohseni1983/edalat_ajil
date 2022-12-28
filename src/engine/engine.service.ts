import { Injectable } from '@nestjs/common';
import { AryaService } from "../arya/arya.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { WebsiteService } from "../website/website.service";

@Injectable()
export class EngineService {
  constructor(
    private readonly aryaService:AryaService,
    @InjectRepository(ProductEntity) private readonly productRepo:Repository<ProductEntity>,
    private readonly websiteService:WebsiteService
  ) {
  }

  async manageProducts(){
    const aryaProdcuts:any=await this.aryaService.getProducts(process.env.ARYA_CREDENTIAL);
    for(let item of aryaProdcuts){
      const existProduct=await this.productRepo.findOne({where:{GoodCode:item.GoodCode}})
      if(existProduct)
      {
        return await this.updateProduct(item,existProduct)
      }else {
        return await this.addProduct(item)
      }
    }
  }

  async addProduct(item:any){
    const webSiteProduct=await this.websiteService.addNewProduct(
      {
        statusId: item.Mojodi>0?1:3,
        code: `140111${item.GoodCode}`,
        wholesalePrice: item.SellPrice,
        retailPrice: item.SellPrice,
        off: item.Discount,
        name: item.GoodName,
        quantity: item.Mojodi,
      }
    )
    const product= await this.productRepo.save(item)
    return {saveToSite:!!webSiteProduct,saveToProducts:!!product}
  }

  async updateProduct(item:any,product:ProductEntity){
    const updatePriceToSite=await this.websiteService.findProductAndUpdatePrice(
      `140111${product.GoodCode}`,
      item.SellPrice/10
    )
    const updateMojodiToSite=await this.websiteService.findAndUpdateMojodi(
      `140111${product.GoodCode}`,
      item.Mojodi > 0
    )
    product.SellPrice=item.SellPrice
    product.Discount=item.Discount
    item.Mojodi>0?product.mojod=true:product.mojod=false;
    product.Mojodi=item.Mojodi
    product.LastUpdate=new Date()
    const saved=await this.productRepo.save(product)
    return {updatePrice:!!updatePriceToSite,updateMojodi:!!updateMojodiToSite,updateProduct:!!saved}
  }


}
