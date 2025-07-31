import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity({ schema: 'ADM', name: "units" })
export class Units extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

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