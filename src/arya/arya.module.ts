import { Module } from '@nestjs/common';
import { AryaService } from './arya.service';
import { SoapModule } from "nestjs-soap";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [AryaService],
  imports:[
    SoapModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      clientName: "ARYA_CLIENT",
      useFactory:()=>({
        uri: process.env.ARYA_URL,
      })

    })
  ],
  exports:[AryaService]
})
export class AryaModule {}
