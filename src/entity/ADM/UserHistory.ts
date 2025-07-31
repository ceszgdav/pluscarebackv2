import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, BaseEntity } from "typeorm"
import { Roles } from "./Roles";
import { User } from "./User";

@Entity({ schema: 'ADM', name: "users_history" })
export class UserHistory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'id_user' })
    id_user: User[];

    @Column({ type: "varchar", length: 255, nullable: true })
    uuid: string;

    @Column({ type: "varchar", length: 150 })
    email: string;

    @Column({ type: "varchar", length: 50 })
    username: string;

    @Column({ nullable: true })
    token: string;

    @ManyToOne(() => Roles, role => role.id)
    @JoinColumn({ name: 'id_role' })
    id_role: number;

    @Column({ type: Date, nullable: true })
    last_login_at: Date;

    @ManyToOne(() => User, user => user.id, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updated_by: User[];

    @UpdateDateColumn()
    updated_at: Date;

}
