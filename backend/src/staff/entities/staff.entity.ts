import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, comment: "工号" })
  jobNumber!: string;

  @Column({ length: 100, comment: "员工姓名" })
  name!: string;

  @Column({ nullable: true, length: 50, comment: "头像" })
  avatar!: string;

  @Column({ nullable: true, length: 50, comment: "性别" })
  sex!: string;
  @Column({ nullable: true, length: 50, comment: "联系电话" })
  contactNumber!: string;
  @Column({ nullable: true, length: 50, comment: "联系地址" })
  contactAddress!: string;

  @Column({ nullable: true, comment: "备注" })
  remark!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
