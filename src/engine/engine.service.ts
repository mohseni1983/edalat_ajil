import { Injectable } from '@nestjs/common';
import { AryaService } from "../arya/arya.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ILike, Repository } from "typeorm";
import { WebsiteService } from "../website/website.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class EngineService {
  constructor(
    private readonly aryaService:AryaService,
    @InjectRepository(ProductEntity,'SQLITE') private readonly productRepo:Repository<ProductEntity>,
    private readonly websiteService:WebsiteService
  ) {
    //this.manageProducts()
  }

  async getProductList(){
    return await this.productRepo.find()
  }

  async manageProducts(){
    let products=[]
    const aryaProdcuts:any=await this.aryaService.getProducts(process.env.ARYA_CREDENTIAL);
    for(let item of aryaProdcuts){
      const existProduct=await this.productRepo.findOne({where:{GoodCode:item.GoodCode}})
      let result=null;
      if(existProduct)
      {
        result= await this.updateProduct(item,existProduct)
      }else {
        result= await this.addProduct(item)
      }
      products.push({code:item.GoodCode,name:item.GoodName,result:result})
    }
    return products
  }

  async addProduct(item:any){
    const webSiteProduct=await this.websiteService.addNewProduct(
      {
        statusId: item.Mojodi>0?1:3,
        code: `140111${item.GoodCode}`,
        wholesalePrice: Number(item.SellPrice)/10,
        retailPrice: Number(item.SellPrice)/10,
        off: item.Discount,
        name: item.GoodName,
        quantity: item.Mojodi,
        product_category_id:2,
        tag_Ids:'[5]',
        product_weight:item.UnitDescription,
        about: item.GoodName,
        date: new Date()
      }
    )
    const product= await this.productRepo.save(item)
    return {saveToSite:webSiteProduct,saveToProducts:!!product}
  }

  async updateProduct(item:any,product:ProductEntity){
    let updatePriceToSite=false;
    let updateMojodiToSite=false;
    if(product.SellPrice!==item.SellPrice/10) {
      //console.log('Start updating prices')
      //console.log('Price changed for : ',item.GoodCode)
       updatePriceToSite = await this.websiteService.findProductAndUpdatePrice(
        `140111${product.GoodCode}`,
        Number(item.SellPrice) / 10
      )
    }
    if(item.Mojodi!=product.Mojodi) {
       updateMojodiToSite = await this.websiteService.findAndUpdateMojodi(
        `140111${product.GoodCode}`,
        item.Mojodi > 0
      )
    }
    product.SellPrice=Number(item.SellPrice)/10
    product.Discount=item.Discount
    item.Mojodi>0?product.mojod=true:product.mojod=false;
    product.Mojodi=item.Mojodi
    product.LastUpdate=new Date()
    const saved=await this.productRepo.save(product)
    return {updatePrice:!!updatePriceToSite,updateMojodi:!!updateMojodiToSite,updateProduct:!!saved}
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  executeSync(){
    this.manageProducts().then(()=>{
      console.log('Synced at '+ new Date())
    })
  }

  async getAllProducts(){
    return await this.productRepo.find()
  }

  async findProductByTitle(findDto:FindProductDto){
    return await this.productRepo.find({where:{GoodName: ILike(`%${findDto.productName}%`)}})

  }

  async getAllWebsiteProducts(){
    return await this.websiteService.getAllAryaProducts()
  }


}
