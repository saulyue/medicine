import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  async findAll() {
    const query = this.clientRepository.createQueryBuilder('entity');

    // 添加你的查询条件、排序等

    const [data, total] = await Promise.all([
      query.getMany(),
      query.getCount(),
    ]);
    return { data, total };
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
