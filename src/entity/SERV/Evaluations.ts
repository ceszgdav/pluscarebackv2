import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, Long, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "evaluations" })
export class Evaluations extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ nullable: true, default: false })
  applyEvaluation: boolean;

  @Column({ type: "bigint", nullable: true })
  init_evaluation_event: string;

  // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Column({ nullable: true })
  init_evaluation_rate: number;

  @Column({ nullable: true, default: false })
  applyPrimaryEvaluation: boolean;

  @Column({ nullable: true })
  consciousness_state_person: number;

  @Column({ nullable: true })
  consciousness_state_time: number;

  @Column({ nullable: true })
  consciousness_state_space: number;

  @Column({ nullable: true })
  pupillary_evaluation: number;

  @Column({ nullable: true, default: false })
  applySecondaryEvaluation: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  occular_response: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  verbal_response: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  motor_response: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  glasgow_response: string;

  @Column({ nullable: true })
  facial_asymmetry: number;

  @Column({ nullable: true })
  facial_asymmetry_charge: number;

  @Column({ nullable: true })
  lowering_arm: number;

  @Column({ nullable: true })
  lowering_arm_charge: number;

  @Column({ nullable: true })
  lenguage_state: number;

  @Column({ nullable: true })
  cincinnatti_state: number;

  @Column({ nullable: true })
  rcp: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  airway_second_evaluation: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  medicaments: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  shocks_j: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  qty: string;

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