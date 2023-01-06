import { Controller, Get } from "@nestjs/common";
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

  @Get('sync')
  async syncProducts(){
    return await this.engineService.manageProducts();
  }


}
