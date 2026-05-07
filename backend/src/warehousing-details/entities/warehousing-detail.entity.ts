import { Entity,ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Medicine } from "../../medicine/entities/medicine.entity";

@Entity()
export class WarehousingDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable:false, length:50,comment:"入库单号"})
  warehouseOrderNumber!: string;

  @Column({length:50,comment:"药品编码"})
  drugCode!: string;

  @Column({type: 'date' ,comment:"生产日期"})
  productionDate!: Date;

  @Column({type: 'date' ,comment:"有效期"})
  validityPeriod!: Date;

  @Column({comment:"入库数量"})
  inboundQuantity!: number;

  @Column({comment:"进货价"})
  purchasePrice!: number;

  @Column({comment:"总金额"})
  lumpSum!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

}
