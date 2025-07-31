import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { Roles } from "./Roles";

@Entity({ schema: 'ADM', name: "operatos_history" })
export class OperatorsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ nullable: true })
  @ManyToOne(() => Roles, role => role.id)
  @JoinColumn({ name: 'id_role' })
  id_role: number;

  @Column({ type: "varchar", length: 50 })
  licence_number: string;

  @Column({ type: "varchar", length: 50 })
  due_date_licence: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}