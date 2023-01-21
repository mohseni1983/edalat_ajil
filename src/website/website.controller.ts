import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FindProductDto } from "src/engine/dto/find-product.dto";
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

  @Post('product/find')
  async findProduct(@Body() findDto:FindProductDto){
    return await this.websiteService.findWebsiteProduct(findDto)
  }

  @Delete('delete/all')
  async deleteAllProducts(){
    return await this.websiteService.deleteAllAryaProducts()
  }
  @Delete('delete/:code')
  async deleteAryaProduct(@Param('code') code:string){
    return await this.websiteService.deleteAryaProduct(code)
  }

  @Get('product/zero')
  async productDoPrice(){
    return await this.websiteService.grabZeroFromProducts()
  }
}
