import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Delivers } from "./Delivers";

@Entity({ schema: 'RED', name: "bank_accounts_delivers" })
export class BanksAccountsDelivers extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Delivers, deliver => deliver.id, { nullable: true })
  @JoinColumn({ name: 'deliver_id' })
  deliver_id: Delivers[];

  @Column({ type: "varchar", length: 50 })
  card_number: string;

  @Column({ type: "varchar", length: 50 })
  clabe_number: string;

  @Column({ type: "varchar", length: 50 })
  bank: string;

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