import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Gender } from "./Gender";

@Entity({ schema: 'CAT', name: "gender_history" })
export class GenderHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Gender, gender => gender.id)
  @JoinColumn({ name: 'id_gender' })
  id_gender: Gender[];

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