import { Module } from '@nestjs/common';
import { SalesDetailsService } from './sales-details.service';
import { SalesDetailsController } from './sales-details.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { Medicine } from "../medicine/entities/medicine.entity";
import { SalesDetail } from "./entities/sales-detail.entity";
import { Delivery } from "../delivery/entities/delivery.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesDetail,Medicine,WarehousingDetail,Delivery]),
  ],
  controllers: [SalesDetailsController],
  providers: [SalesDetailsService],
})
export class SalesDetailsModule {}
