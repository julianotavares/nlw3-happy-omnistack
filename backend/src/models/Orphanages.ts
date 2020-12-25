import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import Image from './Image';
import User from './Users';

@Entity('orphanages')
export default class Orphanage {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	about: string;

	@Column()
	whatsapp: string;

	@Column()
	instructions: string;

	@Column()
	opening_hours: string;

	@Column()
	open_on_weekend: boolean;

	@OneToMany(() => Image, image => image.orphanage, {
		cascade: ['insert', 'update']
	})
	
	@JoinColumn({ name: 'orphanage_id' })
	images: Image[];

	@ManyToOne(() => User, user => user.orphanages)
	
	@JoinColumn({ name: 'user_id' })
	user: User;
}