/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { IData_User } from "@/interfaces";
import { data_user } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			DATA_USER: {
				name: string;
				last_name: string;
				second_last_name: string;
			};
	  }
	| IData_User;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
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

async function update_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id_Data_User, nameValue, last_nameValue, second_last_nameValue } =
		req.body;

	if (!id_Data_User) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		const user = await data_user.findOne({
			where: { id_Data_User: id_Data_User },
		});

		if (!user) {
			return res.status(404).json({ message: "El usuario no existe" });
		}

		await data_user.update(
			{
				name: nameValue,
				last_name: last_nameValue,
				second_last_name: second_last_nameValue,
			},
			{ where: { id_Data_User: id_Data_User } },
		);
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se actualizo con exito" });
}

async function create_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		name = "",
		last_name = "",
		second_last_name = "",
	} = req.body as {
		name: string;
		last_name: string;
		second_last_name: string;
	};

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
	let dat_user;
	try {
		await db.connect();
		dat_user = await data_user.create({
			name,
			last_name,
			second_last_name,
		});
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(200).json({
		DATA_USER: {
			name,
			last_name,
			second_last_name,
		},
		//message: "Hola",
	});
}

async function delet_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const dat = req.body;

	if (!dat) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		await data_user.destroy({ where: { id_Data_User: Number(dat) } });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se elimino con exito" });
}
