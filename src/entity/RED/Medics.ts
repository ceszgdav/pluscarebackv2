import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";

@Entity({ schema: 'RED', name: "medics" })
export class Medics extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  state: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  professional_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  bank_account_number: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  card_number: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  entity_bank: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  available_schedule: string;

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