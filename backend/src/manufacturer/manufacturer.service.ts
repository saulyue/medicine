import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Manufacturer } from "./entities/manufacturer.entity";


@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}
  create(createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerRepository.save(createManufacturerDto);
  }

  async findAll() {
    const query = this.manufacturerRepository.createQueryBuilder('entity');

    // 添加你的查询条件、排序等

    const [data, total] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);
    return { data, total };
  }

  findOne(id: number) {
    return this.manufacturerRepository.findOneBy({ id });
  }

  update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerRepository.update(id, updateManufacturerDto);
  }

  remove(id: number) {
    return this.manufacturerRepository.delete(id);
  }
}
