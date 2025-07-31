import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { ServiceType } from "../CAT/ServiceTypes";
import { EventPlaces } from "../CAT/EventPlaces";
import { Gender } from "../CAT/Gender";
import { Rightful } from "../CAT/Rightfuls";
import { Insurance } from "../ADM/Insurance";
import { Paramedics } from "../ADM/Paramedics";
import { ServicePaper } from "./ServicePaper";

@Entity({ schema: 'SERV', name: "incidents" })
export class Incidents extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  creation_event_place: string;

  @Column({ nullable: true, default: 1 })
  programmed: boolean;

  @Column({ nullable: true, default: 1 })
  external: boolean;

  @ManyToOne(() => Insurance, insurance => insurance.id, { nullable: true })
  @JoinColumn({ name: 'id_insurance' })
  id_insurance: Insurance[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  service_cost: number;

  @Column({ nullable: true })
  type_transfer: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  requester: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  folio: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  received_call: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  activation_call: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  answer_call: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  arrive_hour: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  contact_hour: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  finished_hour: string;

  @Column({ type: "varchar", nullable: true })
  observation: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  expedient: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  departure_time: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  on_site: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  start_transfer: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  on_hospital: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  wait_Time: string;

  @Column({ nullable: true })
  event_type: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  kms: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  registrationaereosupport: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  kilometer: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  event_location: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  event_between_street_one: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  event_between_street_two: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  event_neighborhood: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  event_township: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_name: string;

  @Column({ nullable: true })
  patient_year: number;

  @Column({ nullable: true })
  patient_diagnostic: string;

  @Column({ nullable: true })
  with_frap: boolean;

  @Column({ nullable: true })
  with_recipe: boolean;

  @Column({ nullable: true })
  with_report: boolean;

  @Column({ nullable: true })
  email_serv_ambulance: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  patient_weight: number;

  @ManyToOne(() => Gender, gender => gender.id, { nullable: true })
  @JoinColumn({ name: 'patient_gender' })
  patient_gender: Gender[];

  @ManyToOne(() => Paramedics, paramedic => paramedic.id, { nullable: true })
  @JoinColumn({ name: 'id_paramedic' })
  id_paramedic: Paramedics[];

  @Column({ type: "varchar", length: 50, nullable: true })
  paramedic: string;

  @Column({ nullable: true })
  patient_zip_code: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_city: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_state: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_phone: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_address: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_address_destiny: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_occupation: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_on_charge: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  patient_company: string;

  @ManyToOne(() => Rightful, rightful => rightful.id, { nullable: true })
  @JoinColumn({ name: 'patient_beneficiary' })
  patient_beneficiary: number;

  @Column({ default: 0, nullable: true })
  initialized: number;

  @ManyToOne(() => ServicePaper, servicePaper => servicePaper.id, { nullable: true })
  @JoinColumn({ name: 'id_service_paper' })
  id_service_paper: number;

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