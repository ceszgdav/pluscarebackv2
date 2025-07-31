import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Suppliers } from "./Suppliers";

@Entity({ schema: 'RED', name: "supplier_contacts_history" })
export class SupplierContactsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Suppliers, suppliers => suppliers.id, { nullable: true })
  @JoinColumn({ name: 'id_supplier' })
  id_supplier: Suppliers[]

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'varchar', length: 50 })
  email: string

  @Column({ type: 'varchar', length: 15 })
  phone: string

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}