import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { ServiceTransfer } from "./ServiceTransfer";

@Entity({ schema: 'CAT', name: "service_transfer_history" })
export class ServiceTransferHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceTransfer, serviceTransfer => serviceTransfer.id)
  @JoinColumn({ name: 'id_service_transfer' })
  id_service_transfer: ServiceTransfer[];

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