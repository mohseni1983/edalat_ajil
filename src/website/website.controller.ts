import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WebsiteService } from "./website.service";

@Controller('website')
export class WebsiteController{
  constructor(
    private readonly websiteService:WebsiteService
  ) {
  }

  @Get('all')
  async getAllProducts(){
    return await this.websiteService.getAllAryaProducts()
  }

  @Delete('delete/all')
  async deleteAllProducts(){
    return await this.websiteService.deleteAllAryaProducts()
  }
  @Delete('delete/:code')
  async deleteAryaProduct(@Param('code') code:string){
    return await this.websiteService.deleteAryaProduct(code)
  }
}
