import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Storage } from "../storage/entities/storage.entity";
import { Repository } from "typeorm";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { Delivery } from "./entities/delivery.entity";
import dayjs from "dayjs";

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

  ) {}
  create(createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryRepository.save(createDeliveryDto);
  }

  async findAll(params:any) {
    console.log(params);
    const { current=1,pageSize=20 } = params;
    const [warehouseOrders, total]:any = await this.deliveryRepository.findAndCount({
      skip: (current - 1) * pageSize,
      take: pageSize,
    });

    return {data:warehouseOrders,total};
  }

  findOne(id: number) {
    return this.deliveryRepository.findOneBy({ id });
  }
  async code() {
    const data = await this.deliveryRepository.find({
      select: ["salesOrderNumber"],
      order: {
        id: "DESC",
      },
      take: 1,
    });
    const salesOrderNumber = data[0].salesOrderNumber;
    let index = parseInt(salesOrderNumber.substring(10, 13), 10) + 1;
    const dateString = salesOrderNumber.substring(2, 10);
    const y = dateString.substring(0, 4);
    const m = dateString.substring(4, 6);
    const d = dateString.substring(6, 8);
    const isSame = dayjs().isSame(dayjs(`${y}-${m}-${d}`), "day");
    if (!isSame) {
      index = 1;
    }
    const newCode = `CK${dayjs().format("YYYYMMDD")}${index
      .toString()
      .padStart(3, "0")}`;
    return {data: newCode};
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryRepository.update(id, updateDeliveryDto);
  }

  remove(id: number) {
    return this.deliveryRepository.delete(id);
  }
}
