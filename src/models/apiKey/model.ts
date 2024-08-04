import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import User from "../user/model";
import IApiKey from "./inteface";

@Entity()
export default class APIKey implements IApiKey {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => User)
	user: User;

	@Column()
	key: string;

	@Column()
	expiratAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
