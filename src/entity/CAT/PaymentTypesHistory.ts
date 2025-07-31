import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { PaymentTypes } from "./PaymentTypes";

@Entity({ schema: 'CAT', name: "payment_types_history" })
export class PaymentTypesHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentTypes, pt => pt.id)
  @JoinColumn({ name: 'id_payment_type' })
  id_payment_type: PaymentTypes[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}