import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { Roles } from "./Roles";

@Entity({ schema: 'ADM', name: "operatos" })
export class Operators extends BaseEntity {

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
  token: string;

  @Column({ nullable: true })
  @ManyToOne(() => Roles, role => role.id)
  @JoinColumn({ name: 'id_role' })
  id_role: number;

  @Column({ type: Date, nullable: true })
  last_login_at: Date;

  @Column({ type: "varchar", length: 50 })
  licence_number: string;

  @Column({ type: "varchar", length: 50 })
  due_date_licence: string;

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  deleted: number;

  @Column({ default: 'operador' })
  user_type: string;

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