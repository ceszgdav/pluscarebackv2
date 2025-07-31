import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Suppliers } from "../RED/Suppliers";
import { Paramedics } from "../ADM/Paramedics";
import { Operators } from "../ADM/Operators";
import { Units } from "../ADM/Units";
import { Insurance } from "../ADM/Insurance";
import { Incidents } from "./Incidents";
import { ServiceType } from "../CAT/ServiceTypes";

@Entity({ schema: 'SERV', name: "service_paper" })
export class ServicePaper extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  folio: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  creation_event_place: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  date: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  programmed: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  external: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  received_call: string;

  @ManyToOne(() => Insurance, insurence => insurence.id, { nullable: true })
  @JoinColumn({ name: 'id_insurance' })
  id_insurance: Insurance[];

  @Column({ type: "varchar", length: 255, nullable: true })
  activation_call: string;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'place_occurrence' })
  place_occurrence: Incidents[];

  @Column({ type: "varchar", length: 255, nullable: true })
  answer_call: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  service_cost: string;

  @Column({ default: 0, nullable: true })
  iva: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  expedient: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  requester: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_year: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_diagnostic: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  patient_weight: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_phone: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_address: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  patient_address_destiny: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  arrive_hour: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  observation: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  contact_hour: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  finished_hour: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name_support: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  equipment_used_support: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost_support: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deducible_support: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  units: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  operators: string;

  @ManyToOne(() => Units, unit => unit.id, { nullable: true })
  @JoinColumn({ name: 'unit' })
  unit: Units[];

  @ManyToOne(() => Operators, operator => operator.id, { nullable: true })
  @JoinColumn({ name: 'operator' })
  operator: Operators[];

  @ManyToOne(() => ServiceType, serviceType => serviceType.id, { nullable: true })
  @JoinColumn({ name: 'id_paramedic' })
  id_paramedic: ServiceType[];

  @Column({ type: "varchar", length: 255, nullable: true })
  paramedic: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  departure_time: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  on_site: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  with_frap: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  start_transfer: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  with_recipe: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  on_hospital: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  with_report: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: false })
  email_serv_ambulance: string;

  @Column({ default: 0, nullable: true })
  initialized: number;

  @Column({ default: 1, nullable: true })
  active: number;

  @Column({ default: 0, nullable: true })
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