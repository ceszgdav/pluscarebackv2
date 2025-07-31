import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { MeasurementUnit } from "../CAT/MeasurementUnit";
import { Medicines } from "./Medicines";

@Entity({ schema: 'ADM', name: "medicines_history" })
export class MedicinesHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicines, medicines => medicines.id)
  @JoinColumn({ name: 'id_medicine' })
  id_medicine: Medicines[]

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column()
  id_medicines_category: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @Column()
  quantity: number;

  @ManyToOne(() => MeasurementUnit, mu => mu.id)
  @JoinColumn({ name: 'id_measurement_unit' })
  id_measurement_unit: MeasurementUnit[]

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}