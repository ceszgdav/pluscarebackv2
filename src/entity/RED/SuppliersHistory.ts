import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Suppliers } from "./Suppliers";

@Entity({ schema: 'RED', name: "suppliers_history" })
export class SuppliersHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Suppliers, supplier => supplier.id)
  @JoinColumn({ name: 'id_supplier' })
  id_supplier: Suppliers[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  social_reazon: string

  @Column({ type: 'varchar', length: 100 })
  rfc: string

  @Column()
  zip_code: string

  @Column({ type: 'varchar', length: 50 })
  neighborhood: string

  @Column({ type: 'varchar', length: 50 })
  city: string

  @Column({ type: 'varchar', length: 50 })
  state: string

  @Column({ type: 'varchar', length: 50 })
  country: string

  @Column()
  street_number: number

  @Column({ type: 'varchar', length: 10 })
  internal_number: string

  @Column({ type: 'varchar', length: 30 })
  street: string

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}