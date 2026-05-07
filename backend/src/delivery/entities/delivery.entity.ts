import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:50,comment:"客户名称"})
  clientsName!: string;

  @Column({comment:"收货地址"})
  shippingAddress!: string;

  @Column({ type: 'date' ,comment:"发货日期"})
  shipDate!: Date;

  @Column({length:20,comment:"销售单号"})
  salesOrderNumber!: string;

  @Column({nullable: true,length:50,comment:"联系人"})
  contactPerson!: string;

  @Column({nullable: true,length:15,comment:"联系电话"})
  contactPhone!: string;

  @Column('decimal', {default: 0 , precision: 10, scale: 2 ,comment:"应收金额"})
  amountReceivable!: number;

  @Column('decimal', {default: 0 , precision: 10, scale: 2 ,comment:"实收金额"})
  amountActuallyReceived!: number;

  @Column('decimal', {default: 0 , precision: 10, scale: 2 ,comment:"剩余金额"})
  balance!: number;

  @Column({nullable: true,length:50,comment:"经办人"})
  processor!: string;

  @Column({comment:"备注", nullable: true})
  remark!: string;

  @Column({ default: 0, nullable: false, comment: "状态" })
  status!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
