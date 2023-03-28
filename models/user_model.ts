import { DataTypes } from "sequelize";
import { db } from "../database/db";
import { file_model } from "./file_model";

export const user_model = db.define("user", {
	// Model attributes are defined here
	id_User: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	second_last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type_User: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

user_model.hasMany(file_model, { onDelete: "CASCADE", onUpdate: "CASCADE" });
