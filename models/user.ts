import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const user = db.define("user", {
	// Model attributes are defined here
	id_User: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type_User: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
