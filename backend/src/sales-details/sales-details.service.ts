import { Injectable } from "@nestjs/common";
import { CreateSalesDetailDto } from "./dto/create-sales-detail.dto";
import { UpdateSalesDetailDto } from "./dto/update-sales-detail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { Repository } from "typeorm";
import { Medicine } from "../medicine/entities/medicine.entity";
import { SalesDetail } from "./entities/sales-detail.entity";
import { Delivery } from "../delivery/entities/delivery.entity";

@Injectable()
export class SalesDetailsService {
  constructor(
    @InjectRepository(WarehousingDetail)
    private readonly warehousingDetailRepository: Repository<WarehousingDetail>,
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,

    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
    @InjectRepository(SalesDetail)
    private salesRepository: Repository<SalesDetail>
  ) {}
  async create(createSalesDetailDto: CreateSalesDetailDto) {
    const { lumpSum, salesOrderNumber, salesVolume, drugCode } =
      createSalesDetailDto;

    const data = await this.salesRepository.find({
      where: { salesOrderNumber },
    });

    // const count = await this.salesRepository.findOneBy({
    //   salesOrderNumber,
    //   drugCode,
    // });
    // if (count) {
    //   throw new Error("Data already exists");
    // }
    // const total = data.reduce(
    //   (acc, item) => acc + item.salesVolume,
    //   salesVolume
    // );
    const totalLumpSum = data.reduce(
      (acc, item) => acc + item.lumpSum,
      lumpSum
    );
    await this.deliveryRepository.update(
      { salesOrderNumber },
      { amountReceivable: totalLumpSum, balance: totalLumpSum }
    );

    return this.salesRepository.save(createSalesDetailDto);
  }

  async findAll(params: any) {
    console.log(params);
    const { current = 1, pageSize = 100, salesOrderNumber } = params;
    const [data, total] = await this.salesRepository
      .createQueryBuilder("w")
      .leftJoinAndMapOne("w.medicine", Medicine, "m", "w.drugCode = m.drugCode")
      .leftJoinAndMapOne(
        "w.warehouseOrder",
        WarehousingDetail,
        "d",
        "w.warehouseOrderNumber = d.warehouseOrderNumber"
      )
      .where("w.salesOrderNumber = :salesOrderNumber", { salesOrderNumber })
      .skip((current - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return { data, total };
  }

  findOne(id: number) {
    return this.salesRepository.findOneBy({ id });
  }

  async update(id: number, updateSalesDetailDto: UpdateSalesDetailDto) {
    const { salesOrderNumber, lumpSum, drugCode }: any = updateSalesDetailDto;
    try {
      const data = await this.salesRepository.find({
        where: { salesOrderNumber },
      });
      const totalLumpSum = data.reduce((acc, item) => {
        let i = item.lumpSum;
        if (item.drugCode === drugCode) {
          i = 0;
        }
        return acc + i;
      }, lumpSum);
      await this.deliveryRepository.update(
        { salesOrderNumber },
        {
          amountReceivable: totalLumpSum,
          balance: totalLumpSum,
        }
      );
    } catch (err) {
      console.log(err);
    }

    return await this.salesRepository.update(id, updateSalesDetailDto);
  }

  async remove(id: number) {
    const data: any = await this.salesRepository.findOneBy({ id });
    const delivery: any = await this.deliveryRepository.findOneBy({
      salesOrderNumber: data.salesOrderNumber,
    });
    await this.deliveryRepository.update(
      { salesOrderNumber: data.salesOrderNumber },
      {
        amountReceivable: delivery.amountReceivable - data.lumpSum,
        balance: delivery.balance - data.lumpSum,
      }
    );
    return this.salesRepository.delete(id);
  }
}
