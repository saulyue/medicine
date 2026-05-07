import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, comment: "供应商名称" })
  supplierName!: string;

  @Column({ length: 50, comment: "供应商地址" })
  supplierAddress!: string;

  @Column({ nullable: true, length: 50, comment: "联系人" })
  contactPerson!: string;
  @Column({ nullable: true, length: 50, comment: "联系电话" })
  contactNumber!: string;

  @Column({ nullable: true, comment: "备注" })
  remark!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
