import {
  Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity,
  ManyToOne,
  JoinColumn
} from "typeorm";

@Entity({ schema: 'ADM', name: "modules" })
export class Modules extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 40 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  route: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  breadcrumb: string;

  @Column({ nullable: true })
  parent_module: number | undefined | null;

  @Column({ nullable: true })
  position: number;

  @Column({ type: "varchar", length: 40, nullable: true })
  icon: string | undefined | null

  @Column({ type: "varchar", length: 40, nullable: true })
  iconi: string | undefined | null

  @Column({ type: "varchar", length: 40 })
  type: string

  @Column({ nullable: true, default: 1 })
  active: number;

  @Column({ nullable: true, default: 0 })
  deleted: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  children: any[] = []

  subchild: any[] = []

}