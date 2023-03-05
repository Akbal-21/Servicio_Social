import fs from "fs";
import mysql from "mysql2/promise";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

export const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASWORD,
	port: Number(process.env.MYSQL_PORT),
	ssl: {
		// cert: fs.readFileSync("/home/fernando/Documentos/ss/cacert.pem"),
		ca: fs.readFileSync("/home/fernando/Documentos/ss/cacert.pem"),
	},
});

// const sqlconection = {
// isConnected: 0,
// };

export const connect = async () => {
	if (await pool.getConnection()) {
		console.log("connected");
	} else {
		console.log("connecting");
		await pool.getConnection();
		console.log("connected");
	}
};

export const desconect = async () => {
	console.log("desconectado");
	await pool.end();
};
