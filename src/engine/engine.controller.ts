import { Controller, Get } from "@nestjs/common";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { FindProductDto } from "./dto/find-product.dto";
import { EngineService } from "./engine.service";

@Controller('engine')
export class EngineController {
  constructor(
    private readonly engineService:EngineService
  ) {
  }



  @Get()
  async getProduct(){
    return await this.engineService.getProductList()
  }

  @Get('arya/all')
  async getProductsFromArya(){
    return await this.engineService.getProductListFromArya()
  }

  @Get('all')
  async getAllDbProducts(){
    return await this.engineService.getAllProducts()
  }

  @Post('product/find')
  async findProduct(@Body() findDto:FindProductDto){
    return await this.engineService.findProductByTitle(findDto)
  }

  @Get('sync')
  async syncProducts(){
    return await this.engineService.manageProducts();
  }


}
