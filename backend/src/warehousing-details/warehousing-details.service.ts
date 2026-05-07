import { Injectable } from "@nestjs/common";
import { CreateWarehousingDetailDto } from "./dto/create-warehousing-detail.dto";
import { UpdateWarehousingDetailDto } from "./dto/update-warehousing-detail.dto";
import { WarehousingDetail } from "./entities/warehousing-detail.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medicine } from "../medicine/entities/medicine.entity";
import { Storage } from "../storage/entities/storage.entity";

@Injectable()
export class WarehousingDetailsService {
  constructor(
    @InjectRepository(WarehousingDetail)
    private readonly warehousingDetailRepository: Repository<WarehousingDetail>,
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>
  ) {}
  async create(createWarehousingDetailDto: CreateWarehousingDetailDto) {
    const { lumpSum, warehouseOrderNumber, inboundQuantity, drugCode } =
      createWarehousingDetailDto;

    const data = await this.warehousingDetailRepository.find({
      where: { warehouseOrderNumber },
    });

    const count = await this.warehousingDetailRepository.findOneBy({
      warehouseOrderNumber,
      drugCode,
    });
    if (count) {
      throw new Error("Data already exists");
    }

    const total = data.reduce(
      (acc, item) => acc + item.inboundQuantity,
      inboundQuantity
    );
    const totalLumpSum = data.reduce(
      (acc, item) => acc + item.lumpSum,
      lumpSum
    );
    await this.storageRepository.update(
      { warehouseOrderNumber },
      { amountsPayable: totalLumpSum, balance: totalLumpSum }
    );

    return this.warehousingDetailRepository.save(createWarehousingDetailDto);
  }

  async findAll(params: any) {
    console.log(params);
    const { current = 1, pageSize = 100, warehouseOrderNumber } = params;
    const [data, total] = await this.warehousingDetailRepository
      .createQueryBuilder("w")
      .leftJoinAndMapOne("w.medicine", Medicine, "m", "w.drugCode = m.drugCode")
      .where("w.warehouseOrderNumber = :warehouseOrderNumber", {
        warehouseOrderNumber,
      })
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { data, total };
  }

  findOne(id: number) {
    return this.warehousingDetailRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateWarehousingDetailDto: UpdateWarehousingDetailDto
  ) {
    const { warehouseOrderNumber, lumpSum, drugCode, productionDate }: any =
      updateWarehousingDetailDto;

    const data = await this.warehousingDetailRepository.find({
      where: { warehouseOrderNumber },
    });
    const totalLumpSum = data.reduce((acc, item) => {
      let i = item.lumpSum;
      if (item.drugCode === drugCode) {
        i = 0;
      }
      return acc + i;
    }, lumpSum);
    await this.storageRepository.update(
      { warehouseOrderNumber },
      {
        amountsPayable: totalLumpSum,
        balance: totalLumpSum,
      }
    );
    const item = await this.warehousingDetailRepository.update(
      id,
      updateWarehousingDetailDto
    );
    return { ...item, id };
  }

  async remove(id: number) {
    const data: any = await this.warehousingDetailRepository.findOneBy({ id });
    const storage: any = await this.storageRepository.findOneBy({
      warehouseOrderNumber: data.warehouseOrderNumber,
    });
    await this.storageRepository.update(
      { warehouseOrderNumber: data.warehouseOrderNumber },
      {
        amountsPayable: storage.amountsPayable - data.lumpSum,
        balance: storage.balance - data.lumpSum,
      }
    );
    return this.warehousingDetailRepository.delete(id);
  }
}
