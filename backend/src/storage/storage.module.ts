import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Storage } from "./entities/storage.entity";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { Staff } from "../staff/entities/staff.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Storage,WarehousingDetail,Staff])],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
