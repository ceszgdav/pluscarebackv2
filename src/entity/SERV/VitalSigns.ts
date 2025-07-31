import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, Long, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "vital_signs" })
export class VitalSigns extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ default: false })
  applyVitalSigns: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_hour_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_hour_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_hour_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_hour_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_hour_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_breathing_frequency_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_breathing_frequency_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_breathing_frequency_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_breathing_frequency_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_breathing_frequency_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_heart_rate_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_heart_rate_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_heart_rate_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_heart_rate_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_heart_rate_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_o_saturations_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_o_saturations_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_o_saturations_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_o_saturations_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_o_saturations_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_one_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_two_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_one_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_two_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_one_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_two_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_one_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_two_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_one_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_two_arterial_tension_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_temperature_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_temperature_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_temperature_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_temperature_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_temperature_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_glucose_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_glucose_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_glucose_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_glucose_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_glucose_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_first_diuresis_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  second_second_diuresis_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  third_third_diuresis_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  four_four_diuresis_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  five_five_diuresis_vitals: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  responsible_nurse: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dx_indications: string;

  @Column({ default: false })
  applyDrugs: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_first: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_second: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_third: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_four: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_five: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_six: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medicine_seven: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_first: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_second: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_third: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_four: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_five: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_six: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  hour_seven: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_first: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_second: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_third: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_four: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_five: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_six: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dosis_seven: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_first: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_second: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_third: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_four: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_five: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_six: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  via_seven: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  other: string;

  @Column({ default: false })
  applyPlan: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  plan_iv: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  address_destiny: string;

  @Column({ default: false })
  applyDestiny: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  city_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  state_destiny: string;

  @Column({ nullable: true })
  hospital_destiny: number;

  @Column({ type: "varchar", nullable: true })
  other_hospital_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  area_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  bed_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  especiality_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  medic_destiny: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  nourse_destiny: string;

  @Column({ type: "bytea", nullable: true })
  family_sign: Buffer;

  @Column({ type: "bytea", nullable: true })
  medic_sign: Buffer;

  @Column({ type: "bytea", nullable: true })
  final_sign: Buffer;

  @Column({ type: "varchar", length: 100, nullable: true })
  doctor_responsable_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  patient_responsable_name: string;

  @Column({ nullable: true })
  authorize: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  familiar_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  familiar_phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  familiar_address: string;

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