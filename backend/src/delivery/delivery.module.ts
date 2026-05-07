import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "../inventory/entities/inventory.entity";
import { Medicine } from "../medicine/entities/medicine.entity";
import { Delivery } from "./entities/delivery.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Delivery,Medicine,Inventory])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
