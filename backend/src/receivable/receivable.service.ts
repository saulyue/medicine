import { Injectable } from '@nestjs/common';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Receivable } from "./entities/receivable.entity";

const ReceivableCol:any=["paymentDate", "clientsName","contactPerson","contactPhone","amountReceivable","amountActuallyReceived","balance","processor","remark"];
@Injectable()
export class ReceivableService {
  constructor(
    @InjectRepository(Receivable)
    private readonly receivableRepository: Repository<Receivable>, // 注入Receivable实体类的Repository
  ) {}
  create(createReceivableDto: CreateReceivableDto) {
    return this.receivableRepository.save(createReceivableDto);
  }

  findAll() {
    return this.receivableRepository.find({ select: ReceivableCol });
  }

  findOne(id: number) {
    return this.receivableRepository.findOneBy({ id });
  }

  update(id: number, updateReceivableDto: UpdateReceivableDto) {
    return this.receivableRepository.update(id, updateReceivableDto);
  }

  remove(id: number) {
    return this.receivableRepository.delete(id);
  }
}
