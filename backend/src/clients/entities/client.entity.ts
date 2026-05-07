import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:100,comment:"客户名称"})
  clientsName!: string;

  @Column({length:100,comment:"收货地址"})
  shippingAddress!: string;
  @Column({nullable:true,length:50, comment:"联系人"})
  contactPerson!: string;
  @Column({nullable:true,length:50, comment:"联系电话"})
  contactNumber!: string;

  @Column({nullable:true,comment:"备注"})
  remark!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
