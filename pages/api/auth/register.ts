import { db } from "@/database";
import { pool } from "@/database/database";
import { validations } from "@/utils";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2/promise";
/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			users: {
				id_User: number;
				name: string;
				tipo_user: boolean;
			};
	  };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	const { method } = req;

	switch (method) {
		case "POST":
			return register(req, res);
		default:
			res.status(404).json({ message: "Bad request" });
	}
}

async function register(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		nombre = "",
		email1 = "",
		password = "",
	} = req.body as {
		nombre: string;
		email1: string;
		password: string;
	};

	if (password.length < 6) {
		return res
			.status(404)
			.json({ message: "La contraseña debe de ser de 6 caracteres" });
	}

	if (nombre.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (!validations.isValidEmail(email1)) {
		return res.status(404).json({ message: "El email no es valido" });
	}

	const password1 = bcrypt.hashSync(password);
	const email2 = email1.toLocaleLowerCase();

	const query1 =
		"INSERT INTO User (name, correo_User, contra_User, tipo_user) VALUES (?, ?, ?, ?)";

	await db.connect();

	const response1 = await pool.query(query1, [nombre, email2, password1, 1]);
	const resp1 = (<RowDataPacket>response1)[0];

	console.log(resp1);
	console.log("Registro hecho con exito");

	return res.status(200).json({ message: "Hola mundo" });
}
