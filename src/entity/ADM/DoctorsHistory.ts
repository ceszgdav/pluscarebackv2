import { Doctors } from './Doctors';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity({ schema: 'ADM', name: "doctors_history" })
export class DoctorsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Doctors, doctor => doctor.id)
  @JoinColumn({ name: 'id_doctor' })
  id_doctor: Doctors[];

  @Column({ type: "varchar", length: 255, nullable: true })
  uuid: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  professional_id: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  especiality: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  university_degree: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}