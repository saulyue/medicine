import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryController } from "./inventory.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "./entities/inventory.entity";
import { Medicine } from "../medicine/entities/medicine.entity";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { SalesDetail } from "../sales-details/entities/sales-detail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Inventory,Medicine,WarehousingDetail,SalesDetail])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
