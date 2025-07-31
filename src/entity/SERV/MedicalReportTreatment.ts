import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { MedicalReport } from "./MedicalReport";

@Entity({ schema: 'SERV', name: "medical_report_treatment" })
export class MedicalReportTreatment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => MedicalReport, medicalReport => medicalReport.id, { nullable: true })
  @JoinColumn({ name: 'id_medical_report' })
  id_medical_report: MedicalReport;

  @Column({ type: "varchar", length: 50, nullable: true })
  treatment: string;

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