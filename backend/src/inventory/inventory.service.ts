import { Injectable } from "@nestjs/common";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { UpdateInventoryDto } from "./dto/update-inventory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "./entities/inventory.entity";
import { Like, Repository } from "typeorm";
import { Medicine } from "../medicine/entities/medicine.entity";
import { WarehousingDetail } from "../warehousing-details/entities/warehousing-detail.entity";
import { SalesDetail } from "../sales-details/entities/sales-detail.entity";

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(WarehousingDetail)
    private readonly warehousingDetailRepository: Repository<WarehousingDetail>,
    @InjectRepository(SalesDetail)
    private salesRepository: Repository<SalesDetail>
  ) {}
  create(createInventoryDto: CreateInventoryDto) {
    return this.inventoryRepository.save(createInventoryDto);
  }

  async findAll() {
    try {
      const data: any = await this.warehousingDetailRepository
        .createQueryBuilder("")
        .select("drugCode")
        .addSelect("COUNT(*) as count")
        .groupBy("drugCode")
        .getRawMany();

      for (const item of data) {
        const info = await this.warehousingDetailRepository.find({
          where: { drugCode: item.drugCode },
        });
        const medicine: any = await this.medicineRepository.find({
          where: { drugCode: item.drugCode },
        });
        const sales = await this.salesRepository.find({
          where: { drugCode: item.drugCode },
        });
        item.medicine = medicine[0];
        item.totalInventory = info.reduce(
          (acc, item) => acc + item.inboundQuantity,
          0
        );
        item.salesTotally = sales.reduce(
          (acc, item) => acc + item.salesVolume,
          0
        );
        item.totalInventoryPrice = info.reduce(
          (acc, item) => acc + item.lumpSum,
          0
        );
        item.physicalInventory = item.totalInventory - item.salesTotally;
      }

      return { data, total: 0 };
    } catch (e) {
      console.log(e);
    }
    return { data: [], total: 0 };
  }

  async findOne(query: any) {
    const { drugCode } = query;
    const data: any = await this.warehousingDetailRepository.find({
      where: { drugCode },
    });
    for (const item of data) {
      const sales = await this.salesRepository.find({
        where: {
          drugCode: item.drugCode,
          warehouseOrderNumber: item.warehouseOrderNumber,
        },
      });
      const total = sales.reduce((acc, item) => acc + item.salesVolume, 0);
      item.sales = sales;
      item.salesTotally = total;
    }
    return { data, total: 0 };
  }
  async findDrug(query: any) {
    const { drugCode, drugName } = query;
    console.log("drugCode", drugCode, drugName);
    const where = [];
    if (drugName) {
      where.push({
        drugName: Like(`%${drugName}%`),
      });
    }
    if (drugCode) {
      where.push({ drugCode: Like(`%${drugCode}%`) });
    }
    const data = await this.medicineRepository.find({
      select: [
        "drugCode",
        "drugName",
        "alias",
        "specification",
        "manufacturer",
        "dosageForm",
        "package",
        "approvalNumber",
      ],
      where,
    });
    return data.map((e) => ({
      label: e.drugCode,
      value: e.drugCode,
      name: e.drugName,
      alias: e.alias,
      specification: e.specification,
      manufacturer: e.manufacturer,
      dosageForm: e.dosageForm,
      package: e.package,
      approvalNumber: e.approvalNumber,
    }));
  }
  async findOrder(query: any) {
    const { drugCode, keyWords }: any = query;
    const where: any = { drugCode };
    if (keyWords) {
      where.warehouseOrderNumber = Like(`%${keyWords}%`);
    }
    const data = await this.warehousingDetailRepository.find({
      select: [
        "drugCode",
        "warehouseOrderNumber",
        "productionDate",
        "validityPeriod",
        "inboundQuantity",
      ],
      where,
    });
    return data.map((e) => ({
      label: e.warehouseOrderNumber,
      value: e.warehouseOrderNumber,
      name: e.drugCode,
      productionDate: e.productionDate,
      validityPeriod: e.validityPeriod,
      inboundQuantity: e.inboundQuantity,
    }));
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryRepository.update(id, updateInventoryDto);
  }

  remove(id: number) {
    return this.inventoryRepository.delete(id);
  }
}
