import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";
import { Suppliers } from "../RED/Suppliers";
import { Paramedics } from "../ADM/Paramedics";
import { Operators } from "../ADM/Operators";
import { Units } from "../ADM/Units";

@Entity({ schema: 'SERV', name: "programmed_incidents" })
export class ProgrammedIncident extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @ManyToOne(() => Suppliers, supplier => supplier.id)
  @JoinColumn({ name: 'id_supplier' })
  id_supplier: Suppliers[];

  @Column()
  date: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @ManyToOne(() => Paramedics, paramedic => paramedic.id, { nullable: true })
  @JoinColumn({ name: 'id_paramedic' })
  id_paramedic: Paramedics[];

  @Column({ type: "varchar", length: 255, nullable: true })
  paramedic: string;

  @ManyToOne(() => Operators, operator => operator.id, { nullable: true })
  @JoinColumn({ name: 'id_operator' })
  id_operator: Operators[];

  @Column({ type: "varchar", length: 255, nullable: true })
  operator: string;

  @ManyToOne(() => Units, unit => unit.id, { nullable: true })
  @JoinColumn({ name: 'id_unit' })
  id_unit: Units[];

  @Column({ type: "varchar", length: 255, nullable: true })
  unit: string;

  @Column({ type: "varchar", length: 10 })
  plates: string;

  @Column()
  hour: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pluscare_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  supplier_cost: number;

  @Column({ type: "varchar", length: 100 })
  client_name: string;

  @Column({ type: "varchar", length: 100 })
  supplier_folio: string;

  @Column({ default: 1 })
  active: number;

  @Column({ default: 0 })
  deleted: number;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User[];

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'deleted_by' })
  deleted_by: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}