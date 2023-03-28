import { Sequelize } from "sequelize";

export const db = new Sequelize(
	String(process.env.MYSQL_DATABASE),
	String(process.env.MYSQL_USER),
	String(process.env.MYSQL_PASWORD),

	{
		host: String(process.env.MYSQL_HOST),
		dialect: "mysql",
		port: Number(process.env.MYSQL_PORT),
		logging: false,
	},
);

export const connect = async () => {
	try {
		await db.authenticate();
		console.log("Data Base Conected");
	} catch (error) {
		console.log(error);
	}
};

export const desconect = async () => {
	try {
		await db.close();
		console.log("Data Base Desconected");
	} catch (error) {
		console.log(error);
	}
};
