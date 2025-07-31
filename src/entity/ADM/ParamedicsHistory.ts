import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { Paramedics } from "./Paramedics";

@Entity({ schema: 'ADM', name: "paramedics_history" })
export class ParamedicsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paramedics, paramedic => paramedic.id)
  @JoinColumn({ name: 'id_paramedic' })
  id_paramedic: Paramedics[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}