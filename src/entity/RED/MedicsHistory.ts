import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Medics } from "./Medics";

@Entity({ schema: 'RED', name: "medics_history" })
export class MedicsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medics, deliver => deliver.id)
  @JoinColumn({ name: 'id_medic' })
  id_medic: Medics[];

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  location: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  professional_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  bank_account_number: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  entity_bank: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  available_schedule: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}