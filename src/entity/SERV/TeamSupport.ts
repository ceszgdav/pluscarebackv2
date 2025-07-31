import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "team_support" })
export class TeamSupport extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Incidents, incident => incident.id, { nullable: true })
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 100, nullable: true })
  name_support: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost_support: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deducible_support: number;

  @Column({ nullable: true })
  equipment_used_support: string;

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