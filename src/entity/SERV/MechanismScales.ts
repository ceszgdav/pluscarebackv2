import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Gender } from "../CAT/Gender";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "mechanismScales" })
export class MechanismScales extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ nullable: true, default: false })
  applyMechanism: boolean;

  @Column({ nullable: true })
  crash_type: number;

  @Column({ nullable: true })
  crash_with: number;

  @Column({ nullable: true })
  crash_against_object: number;

  @Column({ nullable: true })
  windshield: number;

  @Column({ nullable: true })
  in_car: number;

  @Column({ nullable: true })
  seatbelt: number;

  @Column({ nullable: true })
  aabm: number;

  @Column({ nullable: true, default: false })
  applyAgent: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  fire_gun: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  white_gun: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  ingestion_poisoning: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  inhaletion_poisoning: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  explosion: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  animalHuman: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  fall: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  own_size: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  approx_height: string;

  @Column({ nullable: true, default: false })
  applyBurn: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  electrical_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  acid_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  leak_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  hot_substance_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  vapor_gas_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  biological_burn: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  scq_burn: string;

  @Column({ nullable: true, default: false })
  applyOtherAntecedents: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  others: string;

  @Column({ nullable: true, default: false })
  applyAntecedents: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  init_date: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  init_hour: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  symptoms: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  signals: string;

  @Column({ nullable: true, default: false })
  applyBirth: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  G: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  P: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  A: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  C: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  FPP: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  FUR: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  gestation_week: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  membranes: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  contractions_init: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  frequency: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  duration_contractions: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  contractions_regions: string;

  @Column({ nullable: true })
  newborn_data: number;

  @ManyToOne(() => Gender, gender => gender.id, { nullable: true })
  @JoinColumn({ name: 'newborn_gender' })
  newborn_gender: Gender[];

  @Column({ nullable: true })
  newborn_apgar: number;

  @Column({ nullable: true, default: false })
  applyPostpartum: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  postpartum_hours: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  postpartum_place: string;

  @Column({ nullable: true })
  postpartum_bearing: number;

  @Column({ nullable: true, default: false })
  applyApgar: boolean;

  @Column({ nullable: true })
  heart_rate: number;

  @Column({ nullable: true })
  breathing_effort: number;

  @Column({ nullable: true })
  irritability: number;

  @Column({ nullable: true })
  muscle_tone: number;

  @Column({ nullable: true })
  coloration: number;

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