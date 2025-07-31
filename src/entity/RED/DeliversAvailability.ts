import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Delivers } from "./Delivers";

@Entity({ schema: 'RED', name: "delivers_availability" })
export class DeliversAvailability extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Delivers, deliver => deliver.id, { nullable: true })
  @JoinColumn({ name: 'deliver_id' })
  deliver_id: Delivers[];

  @Column({ type: "varchar", length: 50 })
  day: string;

  @Column({ type: "varchar", length: 50 })
  hourFrom: string;

  @Column({ type: "varchar", length: 50 })
  hourTo: string;

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  deleted: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}