import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { WebsiteProductEntity } from "../entities/website-product.entity";

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options:TypeOrmModuleOptions={
      type: 'mysql',
      host: process.env.WEBSITE_IP,
      synchronize:false,
      database: process.env.WEBSITE_DB,
      username: process.env.WEBSITE_DB_USER,
      password: process.env.WEBSITE_DB_PASS,
      port: 3306,
      entities:[WebsiteProductEntity]

    }
    return options;
  }

}
