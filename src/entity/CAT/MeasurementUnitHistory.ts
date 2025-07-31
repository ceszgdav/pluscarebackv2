import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { MeasurementUnit } from "./MeasurementUnit";

@Entity({ schema: 'CAT', name: "measurement_unit_history" })
export class MeasurementUnitHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MeasurementUnit, mu => mu.id)
  @JoinColumn({ name: 'id_measurement_unit' })
  id_measurement_unit: MeasurementUnit[];

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