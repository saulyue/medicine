import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medicine } from "./entities/medicine.entity";


@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicRepository: Repository<Medicine>, 
  ) {}

  create(createMedicineDto: CreateMedicineDto) {
    return this.medicRepository.save(createMedicineDto);
  }

  async findAll() {
    const query = this.medicRepository.createQueryBuilder('entity');
  
  // 添加你的查询条件、排序等
  
  const [data, total] = await Promise.all([
    query.getMany(),
    query.getCount(),
  ]);
  return { data, total };
  }

  findOne(id: number) {
    return this.medicRepository.findOneBy({ id });
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return this.medicRepository.update(id, updateMedicineDto);
  }

  remove(id: number) {
    return this.medicRepository.delete(id);
  }
}
