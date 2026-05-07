import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity()
export class Medicine {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:40,comment:"药品编码"})
  drugCode!: string;

  @Column({length:40,comment:"药品名称"})
  drugName!: string;

  @Column({length:40, comment:"药品通用名", nullable: true})
  alias!: string;

  @Column({length:50,comment:"规格"})
  specification!: string;

  @Column({length:50,comment:"上市许可持有人"})
  marketingAuthorizationHolder!: string;

  @Column({length:50, comment:"生产厂家"})
  manufacturer!: string;

  @Column({length:10, comment:"剂型"})
    dosageForm!: string;

  @Column({comment:"包装"})
  package!: number;

  @Column({length:20, comment:"批准文号"})
  approvalNumber!: string;

  @Column({comment:"备注", nullable: true})
  remark!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;


}
