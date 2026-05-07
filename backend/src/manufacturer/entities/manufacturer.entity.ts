import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:100,comment:"生产厂家名称"})
  manufacturerName!: string;

  @Column({length:100,comment:"生产厂家地址"})
  manufacturerAddress!: string;
  @Column({nullable:true,length:50, comment:"联系人"})
  contactPerson!: string;
  @Column({nullable:true,length:50, comment:"联系电话"})
  contactNumber!: string;

  @Column({nullable:true,comment:"备注"})
  remark!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
