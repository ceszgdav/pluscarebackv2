import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../ADM/User";

@Entity({ schema: 'RED', name: "suppliers" })
export class Suppliers extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  social_reazon: string

  @Column({ type: 'varchar', length: 100 })
  rfc: string

  @Column()
  zip_code: string

  @Column({ type: 'varchar', length: 50 })
  neighborhood: string

  @Column({ type: 'varchar', length: 50 })
  city: string

  @Column({ type: 'varchar', length: 50 })
  state: string

  @Column({ type: 'varchar', length: 50 })
  country: string

  @Column()
  street_number: number

  @Column({ type: 'varchar', length: 10 })
  internal_number: string

  @Column({ nullable: true, default: false })
  eventSupport: boolean

  @Column({ type: 'varchar', length: 30 })
  street: string

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