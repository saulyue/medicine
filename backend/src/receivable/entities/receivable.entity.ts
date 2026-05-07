import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receivable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' ,comment:"收款日期"})
  paymentDate!: Date;

  @Column({comment:"客户姓名"})
  clientsName!: string;

  @Column({length:50,comment:"联系人"})
  contactPerson!: string;

  @Column({length:15,comment:"联系电话"})
  contactPhone!: string;

  @Column('decimal', { precision: 10, scale: 2 ,comment:"应收金额"})
  amountReceivable!: number;

  @Column('decimal', { precision: 10, scale: 2 ,comment:"实收金额"})
  amountActuallyReceived!: number;

  @Column('decimal', { precision: 10, scale: 2 ,comment:"剩余金额"})
  balance!: number;//剩余金额

  @Column({length:50,comment:"经办人"})
  processor!: string;

  @Column({comment:"备注", nullable: true})
  remark!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
