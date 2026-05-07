import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Supplier } from "./entities/supplier.entity";


@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierDetailRepository: Repository<Supplier>,
  ) {}
  create(createSupplierDto: CreateSupplierDto) {
    return this.supplierDetailRepository.save(createSupplierDto);
  }

  async findAll() {
    const query = this.supplierDetailRepository.createQueryBuilder('entity');

    // 添加你的查询条件、排序等

    const [data, total] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);
    return { data, total };
  }

  findOne(id: number) {
    return this.supplierDetailRepository.findOneBy({ id });
  }
  async dictionary(query: any) {
    const { keyWords } = query;
    const where = [];
    if (keyWords) {
      where.push({
        supplierName: Like(`%${keyWords}%`),
      });
    }
    const data = await this.supplierDetailRepository.find({
      select: [
        "supplierName",
        "contactPerson",
        "contactNumber",
      ],
      where,
    });
    return data.map((e) => ({
      label: e.supplierName,
      value: e.supplierName,
      contactPerson: e.contactPerson,
      contactNumber: e.contactNumber,
    }));
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierDetailRepository.update(id, updateSupplierDto);
  }

  remove(id: number) {
    return this.supplierDetailRepository.delete(id);
  }
}
