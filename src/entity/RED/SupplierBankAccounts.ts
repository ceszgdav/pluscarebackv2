import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Suppliers } from "./Suppliers";

@Entity({ schema: 'RED', name: "supplier_bank_accounts" })
export class SupplierBankAccounts extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Suppliers, suppliers => suppliers.id, { nullable: true })
  @JoinColumn({ name: 'id_supplier' })
  id_supplier: Suppliers[]

  @Column({ type: 'varchar', length: 50 })
  bank: string

  @Column({ type: 'varchar', length: 50 })
  clabe_number: string

  @Column({ type: 'varchar', length: 50 })
  account_number: string

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  deleted: number;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User[];

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'deleted_by' })
  deleted_by: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}