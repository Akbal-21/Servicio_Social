import { DataSource } from "typeorm";
import { Data_User, User } from "./entities";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.MYSQL_HOST,
	username: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASWORD,
	port: Number(process.env.MYSQL_PORT),
	logging: true,
	//synchronize: true,
	entities: [User, Data_User],
});

export const connect = async () => {
	try {
		await AppDataSource.initialize();
	} catch (error) {
		console.log(error);
	}
};

export const desconect = async () => {
	await AppDataSource.destroy();
};

// {
// 	"email":"akbal153@hotmail.com",
// 	"password":"123456"
// }
