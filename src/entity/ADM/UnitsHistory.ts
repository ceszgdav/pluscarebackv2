import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity({ schema: 'ADM', name: "units_history" })
export class UnitsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_unit' })
  id_unit: User[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 100 })
  type: string;

  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column({ type: "varchar", length: 100 })
  unit_name: string;

  @Column({ type: "varchar", length: 100 })
  plate: string;

  @Column({ type: "varchar", length: 100 })
  kilometer: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}