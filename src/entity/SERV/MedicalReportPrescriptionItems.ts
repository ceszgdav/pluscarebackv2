import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { MedicalReport } from "./MedicalReport";
import { MedicalReportPrescription } from "./MedicalReportPrescription";

@Entity({ schema: 'SERV', name: "medical_report_prescription_items" })
export class MedicalReportPrescriptionItems extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => MedicalReportPrescription, prescription => prescription.id, { nullable: true })
  @JoinColumn({ name: 'id_prescription' })
  id_prescription: MedicalReportPrescription;

  @Column({ type: "varchar", length: 50, nullable: true })
  prescription: string;

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