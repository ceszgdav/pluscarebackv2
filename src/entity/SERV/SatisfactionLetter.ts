import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "satisfaction_letter" })
export class SatisfactionLetter extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  date: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  origin: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  destiny: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  relationship: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  sign: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  service_quality: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  how_know_service: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  other: string;

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