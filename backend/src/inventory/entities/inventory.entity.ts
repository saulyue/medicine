import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:50,comment:"药品编码"})
  drugCode!: string;
  @Column({comment:"入库数量"})
  inboundQuantity!: number;
  @Column({comment:"销售数量"})
  salesVolume!: number;

  @Column({comment:"库存数量"})
  stockQuantity!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
