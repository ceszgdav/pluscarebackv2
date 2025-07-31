import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { BanksAccountsDelivers } from "./BanksAccountDelivers";

@Entity({ schema: 'RED', name: "bank_accounts_delivers_history" })
export class BanksAccountsDeliversHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => BanksAccountsDelivers, bad => bad.id, { nullable: true })
  @JoinColumn({ name: 'back_account_id' })
  back_account_id: BanksAccountsDelivers[];

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