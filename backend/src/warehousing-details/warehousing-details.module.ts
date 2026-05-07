import { Module } from "@nestjs/common";
import { WarehousingDetailsService } from "./warehousing-details.service";
import { WarehousingDetailsController } from "./warehousing-details.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WarehousingDetail } from "./entities/warehousing-detail.entity";
import { Medicine } from "../medicine/entities/medicine.entity";
import { Storage } from "../storage/entities/storage.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehousingDetail,Medicine,Storage]),
  ],
  controllers: [WarehousingDetailsController],
  providers: [WarehousingDetailsService],
})
export class WarehousingDetailsModule {}
