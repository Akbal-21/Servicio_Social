import { IUser } from "../../../../interfaces/user_interface";
/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { ModelUser } from "@/models";
import { validations } from "@/utils";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			DATA_USER: {
				email: string;
				password: string;
				name: string;
				last_name: string;
				second_last_name: string;
				type_User: string;
			};
	  };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getUsers(req, res);
		case "PUT":
			return update_User(req, res);

		case "POST":
			return create_User(req, res);

		case "DELETE":
			return delet_User(req, res);

		default:
			break;
	}
	res.status(200).json({ message: "Example" });
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
	let users;
	try {
		await db.connect();

		users = await ModelUser.user_model.findAll({ raw: true, nest: true });

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
	if (!users) {
		return res.status(404).json({ message: "No hay usuarios" });
	}

	return res.status(200).json(users);
}

async function update_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id_User, email, name, last_name, second_last_name, type_User } =
		req.body as IUser;

	console.log(req.body);

	if (!id_User) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		const user = await ModelUser.user_model.findOne({
			where: { id_User },
		});

		if (!user) {
			return res.status(404).json({ message: "El usuario no existe" });
		}

		await ModelUser.user_model.update(
			{
				email,
				name,
				last_name,
				second_last_name,
				type_User,
			},
			{ where: { id_User } },
		);
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).end();
}

async function create_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	let {
		email = "",
		name = "",
		last_name = "",
		second_last_name = "",
		password = "",
		type_User = "",
	} = req.body as {
		email: string;
		name: string;
		last_name: string;
		second_last_name: string;
		password: string;
		type_User: string;
	};

	console.log(req.body);

	if (name.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (last_name.length < 2) {
		return res
			.status(404)
			.json({ message: "El apellido debe de ser de 2 caracteres" });
	}

	if (second_last_name.length < 2) {
		return res
			.status(404)
			.json({ message: "El segundo apellido debe de ser de 2 caracteres" });
	}

	if (!validations.isValidEmail(email)) {
		return res.status(404).json({ message: "El email no es valido" });
	}
	password = bcrypt.hashSync(password);

	try {
		await db.connect();
		await ModelUser.user_model.create({
			email: email.toLocaleLowerCase(),
			password,
			name,
			last_name,
			second_last_name,
			type_User,
		});
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(200).json({
		DATA_USER: {
			email,
			password,
			name,
			last_name,
			second_last_name,
			type_User,
		},
	});
}

async function delet_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const dat = req.body;

	if (!dat) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		await ModelUser.user_model.destroy({
			where: { id_User: Number(dat) },
		});
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se elimino con exito" });
}
