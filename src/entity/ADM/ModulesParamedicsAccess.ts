import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { Modules } from "./Modules";
import { Paramedics } from "./Paramedics";

@Entity({ schema: 'ADM', name: "modules_paramedics_access" })
export class ModulesParamedicsAccess extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modules, module => module.id)
  @JoinColumn({ name: 'id_module' })
  id_module: Modules[];

  @ManyToOne(() => Paramedics, operator => operator.id)
  @JoinColumn({ name: 'id_paramedic' })
  id_paramedic: Paramedics[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}