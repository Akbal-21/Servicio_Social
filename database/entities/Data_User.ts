import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Data_User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_Data_User: number;

	@Column({
    nullable: false,
  })
	name: string;

	@Column({nullable:false})
	last_name: string;

	@Column({
    nullable: false,
  })
	second_last_name: string;
}

// @OneToOne(()=> User, {onDelete: "CASCADE",
// onUpdate: "CASCADE", })
// @JoinColumn({
// name: "id_User",
// referencedColumnName: "id_user",
// foreignKeyConstraintName: "FK_id_User",
// })
