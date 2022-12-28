import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../entities/product.entity";
import { LogEntity } from "../entities/log.entity";

@Injectable()
export class SqliteConfigService implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options:TypeOrmModuleOptions={
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize:true,
      autoLoadEntities:true,
      entities:[ProductEntity,LogEntity]
    }
    return options;
  }

}
