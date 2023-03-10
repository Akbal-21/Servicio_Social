import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const data_user = db.define("data_user", {
	id_Data_User: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
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
});
