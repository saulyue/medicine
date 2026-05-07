import { Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Staff } from "./entities/staff.entity";

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>
  ) {}
  create(createStaffDto: CreateStaffDto) {
    return this.staffRepository.save(createStaffDto);
  }

  async findAll() {
    const query = this.staffRepository.createQueryBuilder("entity");

    // 添加你的查询条件、排序等

    const [data, total] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);
    return { data, total };
  }

  findOne(id: number) {
    return this.staffRepository.findOneBy({ id });
  }
  async dictionary(query: any) {
    const { keyWords } = query;
    const where = [];
    if (keyWords) {
      where.push({
        name: Like(`%${keyWords}%`),
      });
    }
    const data = await this.staffRepository.find({
      select: ["name", "jobNumber"],
      where,
    });
    return data.map((e) => ({
      label: e.name,
      value: e.jobNumber,
    }));
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffRepository.update(id, updateStaffDto);
  }

  remove(id: number) {
    return this.staffRepository.delete(id);
  }
}
