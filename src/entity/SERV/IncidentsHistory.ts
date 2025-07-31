import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../ADM/User";
import { ServiceType } from "../CAT/ServiceTypes";
import { Incidents } from "./Incidents";

@Entity({ schema: 'SERV', name: "incidents_history" })
export class IncidentsHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Incidents, incident => incident.id)
  @JoinColumn({ name: 'id_incident' })
  id_incident: Incidents[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column()
  date: Date;

  @Column()
  hour: string;

  @ManyToOne(() => ServiceType, serviceType => serviceType.id)
  @JoinColumn({ name: 'id_service_type' })
  id_service_type: ServiceType[];

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @Column()
  updated_at: Date;

}