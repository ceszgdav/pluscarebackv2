import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, Long, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Incidents } from "./Incidents";
import { Operators } from "../ADM/Operators";
import { Units } from "../ADM/Units";

@Entity({ schema: 'SERV', name: "operators" })
export class OperatorsService extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Operators, operator => operator.id, { nullable: true })
  @JoinColumn({ name: 'operator' })
  operator: Operators[];

  @ManyToOne(() => Units, unit => unit.id, { nullable: true })
  @JoinColumn({ name: 'unit' })
  unit: Units[];

  @Column({ type: "varchar", length: 50, nullable: true })
  operators: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  units: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  tum: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  dr: string;

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