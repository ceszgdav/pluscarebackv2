import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Delivers } from "../RED/Delivers";
import { DeliverMedications } from "./DeliveryMedications";

@Entity({ schema: 'SERV', name: "deliver_medications_payment" })
export class DeliverMedicationsPayment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => DeliverMedications, deliver => deliver.id, { nullable: true })
  @JoinColumn({ name: 'deliverMedication_id' })
  deliverMedication_id: DeliverMedications[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  payment: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  voucher: string;

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