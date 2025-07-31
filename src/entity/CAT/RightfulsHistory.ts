import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { Rightful } from "./Rightfuls";

@Entity({ schema: 'CAT', name: "rightfuls_history" })
export class RightfulHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rightful, rightful => rightful.id)
  @JoinColumn({ name: 'id_rightful' })
  id_rightful: Rightful[];

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