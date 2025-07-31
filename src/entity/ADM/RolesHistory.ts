import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { Roles } from "./Roles";

@Entity({ schema: 'ADM', name: "role_history" })
export class RolesHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Roles, role => role.id)
  @JoinColumn({ name: 'id_role' })
  id_role: Roles[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}