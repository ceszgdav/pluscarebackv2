import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "../ADM/User";
import { RelationshipTypes } from "./RelationshipTypes";

@Entity({ schema: 'CAT', name: "relationship_types_history" })
export class RelationshipTypesHistory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RelationshipTypes, rt => rt.id)
  @JoinColumn({ name: 'id_relation_type' })
  id_relation_type: RelationshipTypes[];

  @Column({ type: "varchar", length: 255 })
  uuid: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by: User[];

  @UpdateDateColumn()
  updated_at: Date;

}