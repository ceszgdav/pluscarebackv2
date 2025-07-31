import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { MedicinesCategories } from "./MedicinesCategories";

@Entity({ schema: 'CAT', name: "medicines_categories_history" })
export class MedicinesCategoriesHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicinesCategories, mc => mc.id)
  @JoinColumn({ name: 'id_medicine_category' })
  id_medicine_category: MedicinesCategories[];

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