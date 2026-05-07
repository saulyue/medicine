import { Injectable } from "@nestjs/common";
import { CreateStorageDto } from "./dto/create-storage.dto";
import { UpdateStorageDto } from "./dto/update-storage.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Storage } from "./entities/storage.entity";
import { Repository } from "typeorm";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import dayjs from "dayjs";
import { Staff } from "../staff/entities/staff.entity";

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @InjectRepository(WarehousingDetail)
    private readonly warehousingDetailRepository: Repository<WarehousingDetail>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>
  ) {}
  create(createStorageDto: CreateStorageDto) {
    return this.storageRepository.save(createStorageDto);
  }

  async findAll(params: any) {
    console.log(params);
    const { current = 1, pageSize = 20 } = params;
    const [warehouseOrders, total]: any =
      await this.storageRepository.findAndCount({
        order: {
          id: "DESC",
        },
        skip: (current - 1) * pageSize,
        take: pageSize,
      });
    for (const warehouseOrder of warehouseOrders) {
      const details = await this.warehousingDetailRepository.find({
        where: { warehouseOrderNumber: warehouseOrder.warehouseOrderNumber },
      });
      warehouseOrder.lumpSum = details.reduce(
        (acc, item) => acc + item.lumpSum,
        0
      );
      const processor: any = await this.staffRepository.findOneBy({
        jobNumber: warehouseOrder.processor,
      });
      warehouseOrder.processorName = processor.name;
    }
    return { data: warehouseOrders, total };
  }

  findOne(id: number) {
    return this.storageRepository.findOneBy({ id });
  }
  async code() {
    const data = await this.storageRepository.find({
      select: ["warehouseOrderNumber"],
      order: {
        id: "DESC",
      },
      take: 1,
    });
    const warehouseOrderNumber = data[0].warehouseOrderNumber;
    let index = parseInt(warehouseOrderNumber.substring(10, 13), 10) + 1;
    const dateString = warehouseOrderNumber.substring(2, 10);
    const y = dateString.substring(0, 4);
    const m = dateString.substring(4, 6);
    const d = dateString.substring(6, 8);
    const isSame = dayjs().isSame(dayjs(`${y}-${m}-${d}`), "day");
    if (!isSame) {
      index = 1;
    }
    const newCode = `RK${dayjs().format("YYYYMMDD")}${index
      .toString()
      .padStart(3, "0")}`;
    return { data: newCode };
  }

async  update(id: number, updateStorageDto: UpdateStorageDto) {
    const data= await this.storageRepository.update(id, updateStorageDto);
    return {...data,id};
  }

  remove(id: number) {
    return this.storageRepository.delete(id);
  }
}
