import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from "typeorm"
import { Roles } from "./Roles";
import { Permissions } from "./Permissions";

@Entity({ schema: 'ADM', name: "users" })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    uuid: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    name: string;

    @Column({ type: "varchar", length: 150 })
    email: string;

    @Column({ type: "varchar", length: 50 })
    username: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ nullable: true })
    token: string;

    @Column({ nullable: true })
    @ManyToOne(() => Roles, role => role.id)
    @JoinColumn({ name: 'id_role' })
    id_role: number;

    @Column({ nullable: true })
    @ManyToOne(() => Permissions, permission => permission.id)
    @JoinColumn({ name: 'id_permission' })
    id_permission: number;

    @Column({ type: Date, nullable: true })
    last_login_at: Date;

    @Column({ default: 0 })
    deleted: number;

    @Column({ default: 1 })
    active: number;

    @Column({ default: 'usuario' })
    user_type: string;

    @ManyToOne(() => User, user => user.id)
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
