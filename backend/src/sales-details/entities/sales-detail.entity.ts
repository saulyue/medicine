import { Entity,ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Medicine } from "../../medicine/entities/medicine.entity";

@Entity()
export class SalesDetail {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({nullable:false, length:50,comment:"销售单号"})
  salesOrderNumber!: string;

  @Column({nullable:false, length:50,comment:"入库单号"})
  warehouseOrderNumber!: string;

  @Column({length:50,comment:"药品编码"})
  drugCode!: string;

  @Column({comment:"销售数量"})
  salesVolume!: number;

  @Column({comment:"销售价"})
  sellingPrice!: number;

  @Column({comment:"总金额"})
  lumpSum!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

}
