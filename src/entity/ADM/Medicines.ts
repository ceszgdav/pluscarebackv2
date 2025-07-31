import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "./User";
import { MeasurementUnit } from "../CAT/MeasurementUnit";
import { MedicinesCategories } from "../CAT/MedicinesCategories";

@Entity({ schema: 'ADM', name: "medicines" })
export class Medicines extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  // @Column()
  // id_medicines_category: number;

  @ManyToOne(() => MedicinesCategories, mc => mc.id, { nullable: true })
  @JoinColumn({ name: 'id_medicines_category' })
  id_medicines_category: MedicinesCategories[]

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  description: string;

  @Column()
  quantity: number;

  @ManyToOne(() => MeasurementUnit, mu => mu.id, { nullable: true })
  @JoinColumn({ name: 'id_measurement_unit' })
  id_measurement_unit: MeasurementUnit[]

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