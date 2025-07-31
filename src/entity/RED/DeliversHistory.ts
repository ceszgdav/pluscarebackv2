import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Delivers } from "./Delivers";

@Entity({ schema: 'RED', name: "delivers_history" })
export class DeliversHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Delivers, deliver => deliver.id)
  @JoinColumn({ name: 'id_deliver' })
  id_deliver: Delivers[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  location: string;

  @Column({ type: "varchar", length: 50 })
  card_number: string;

  @Column({ type: "varchar", length: 50 })
  clabe_number: string;

  @Column({ type: "varchar", length: 50 })
  bank: string;

  @Column({ type: "varchar", length: 100 })
  ineFront: string;

  @Column({ type: "varchar", length: 100 })
  ineBack: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}