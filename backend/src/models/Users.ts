import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn } from 'typeorm';
import Orphanage from './Orphanages';
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class User {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	@OneToMany(() => Orphanage, orphanage => orphanage.user, {
		cascade: ['insert', 'update']
	})
	@JoinColumn({ name: 'user_id' })
	orphanages: Orphanage[];
}