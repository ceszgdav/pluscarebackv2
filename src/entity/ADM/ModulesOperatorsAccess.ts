import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { Modules } from "./Modules";
import { Operators } from "./Operators";

@Entity({ schema: 'ADM', name: "modules_operators_access" })
export class ModulesOperatorsAccess extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modules, module => module.id)
  @JoinColumn({ name: 'id_module' })
  id_module: Modules[];

  @ManyToOne(() => Operators, operator => operator.id)
  @JoinColumn({ name: 'id_operator' })
  id_operator: Operators[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}