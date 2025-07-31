import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medics } from "../RED/Medics";
import { User } from "../ADM/User";
import { ServicePaperMedicAtHome } from "./ServicePaperMedicAtHome";

@Entity({ schema: 'SERV', name: "medical_report" })
export class MedicalReport extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Medics, medic => medic.id, { nullable: true })
  @JoinColumn({ name: 'id_medic' })
  id_medic: Medics;

  @ManyToOne(() => ServicePaperMedicAtHome, servicePaper => servicePaper.id, { nullable: true })
  @JoinColumn({ name: 'id_service_paper_medic_at_home' })
  id_service_paper_medic_at_home: ServicePaperMedicAtHome;

  @Column({ type: "varchar", length: 50, nullable: true })
  expedient: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  date: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  checkIn: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  checkOut: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  company: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  patientName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  patientAge: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  patientGender: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  allergies: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  transfusions: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  surgical: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  immunizations: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  chronicDegenerative: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  traumas: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  patientHeight: string;

  @Column({ type: "varchar", length: 8, nullable: true })
  patientTemperature: string;

  @Column({ type: "varchar", length: 4, nullable: true })
  patientCardiacFrequency: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  patientWeight: string;

  @Column({ type: "varchar", length: 14, nullable: true })
  bloodPressure: string;

  @Column({ type: "varchar", length: 4, nullable: true })
  respiratoryRate: string;

  @Column({ type: "varchar", length: 5, nullable: true })
  oxygen: string;

  @Column({ type: "varchar", length: 5, nullable: true })
  glucose: string;

  @Column({ type: "text", nullable: true })
  currentCondition: string;

  @Column({ type: "text", nullable: true })
  headNeck: string;

  @Column({ type: "text", nullable: true })
  cardioPulmonary: string;

  @Column({ type: "text", nullable: true })
  abdomen: string;

  @Column({ type: "text", nullable: true })
  limbs: string;

  @Column({ type: "text", nullable: true })
  neurological: string;

  @Column({ type: "text", nullable: true })
  others: string;

  @Column({ type: "text", nullable: true })
  diagnostic: string;

  @Column({ nullable: true, default: false })
  procedures: boolean;

  @Column({ nullable: true, default: false })
  antibiotics: boolean;

  @Column({ nullable: true, default: false })
  labTests: boolean;

  @Column({ nullable: true, default: false })
  gabinetTests: boolean;

  @Column({ nullable: true, default: false })
  hospitalReference: boolean;

  @Column({ nullable: true, default: false })
  ambulanceRide: boolean;

  @Column({ type: "text", nullable: true })
  medicAtTime: string;

  @Column({ type: "text", nullable: true })
  medicRespectful: string;

  @Column({ type: "text", nullable: true })
  medicClear: string;

  @ManyToOne(() => Medics, user => user.id, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User[];

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  deleted: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}