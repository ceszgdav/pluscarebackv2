import {
  Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  JoinColumn, BaseEntity
} from "typeorm";
import { User } from "./User";
import { Modules } from "./Modules";
import { Permissions } from "./Permissions";

@Entity({ schema: 'ADM', name: "permissions_module_user" })
export class PermissionModuleUser extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modules, module => module.id)
  @JoinColumn({ name: 'id_module' })
  id_module: Modules; // Cambiar de `Modules[]` a `Modules`

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'id_user' })
  id_user: User; // Cambiar de `User[]` a `User`

  @ManyToOne(() => Permissions, permission => permission.id)
  @JoinColumn({ name: 'id_permission' })
  id_permission: Permissions; // Cambiar de `Permissions[]` a `Permissions`

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}
