import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_User: number;

	@Column({
    nullable: false,
    unique: true,
  })
	email: string;

	@Column({nullable:false})
	password: string;

	@Column({
    length: 10,
    nullable: false,
  })
	type_User: string;
}
