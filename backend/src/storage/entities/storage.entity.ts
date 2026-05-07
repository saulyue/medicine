import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", comment: "入库日期" })
  storageDate!: Date;

  @Column({ length: 50, comment: "入库单号" })
  warehouseOrderNumber!: string;

  @Column({ nullable: true, comment: "供商名称" })
  supplierName!: string;

  @Column({ nullable: true, length: 50, comment: "联系人" })
  contactPerson!: string;

  @Column({ nullable: true, length: 15, comment: "联系电话" })
  contactPhone!: string;

  @Column("decimal", {
    default: 0,
    precision: 10,
    scale: 2,
    comment: "应付金额",
  })
  amountsPayable!: number;

  @Column("decimal", {
    default: 0,
    precision: 10,
    scale: 2,
    comment: "实付金额",
  })
  theAmountActuallyPaid!: number;

  @Column("decimal", {
    default: 0,
    precision: 10,
    scale: 2,
    comment: "剩余金额",
  })
  balance!: number; //剩余金额

  @Column({ nullable: true, length: 50, comment: "验收结论" })
  acceptanceConclusion!: string;

  @Column({ nullable: true, length: 50, comment: "经办人" })
  processor!: string;

  @Column({ nullable: true, comment: "备注" })
  remark!: string;

  @Column({ default: 0, nullable: false, comment: "状态" })
  status!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
