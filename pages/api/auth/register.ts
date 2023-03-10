/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { data_user, user } from "@/models";
import { validations } from "@/utils";
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
		name = "",
		email = "",
		password = "",
		last_name = "",
		second_last_namme = "",
	} = req.body as {
		name: string;
		email: string;
		password: string;
		last_name: string;
		second_last_namme: string;
	};

	if (password.length < 6) {
		return res
			.status(404)
			.json({ message: "La contraseña debe de ser de 6 caracteres" });
	}

	if (name.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (last_name.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (second_last_namme.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (!validations.isValidEmail(email)) {
		return res.status(404).json({ message: "El email no es valido" });
	}

	const userr = new user();

	const data_use = new data_user();
	await db.connect();

	await db.desconect();

	return res.status(200).json({ message: "Hola mundo" });
}

// "name" : "Fernando",
// "last_name" : "Serrano",
// "second_last_namme" : "Vazuqez",
