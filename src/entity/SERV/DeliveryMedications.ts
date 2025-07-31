import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Delivers } from "../RED/Delivers";

@Entity({ schema: 'SERV', name: "deliver_medications" })
export class DeliverMedications extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Delivers, deliver => deliver.id, { nullable: true })
  @JoinColumn({ name: 'deliver_id' })
  deliver_id: Delivers[];

  @Column({ type: "varchar", length: 2 })
  ensurer: string;

  @Column({ type: "varchar", length: 50 })
  request_date: string;

  @Column({ type: "varchar", length: 50 })
  expedient: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  plan_number: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  payment_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pluscare_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pluscare_price_delivery: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pluscare_price_total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  ensurer_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  ensurer_price_delivery: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  state: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  municipality: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  delivery_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  exceded_cost_payed: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subtotal_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_cost: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  advisor: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  drugstore: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  surplus: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  remarks: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  remaining: number;

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