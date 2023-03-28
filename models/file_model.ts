import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const file_model = db.define("file", {
	// Model attributes are defined here
	id_file: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	file_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type_file: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	size_file: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	file: {
		type: DataTypes.BLOB,
		allowNull: true,
	},
});
