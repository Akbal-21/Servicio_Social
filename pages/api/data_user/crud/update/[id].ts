import { db } from "@/database";
import { Data_User } from "@/database/entities";
import type { NextApiRequest, NextApiResponse } from "next";
/* eslint-disable import/no-anonymous-default-export */

type Data = {
	message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "PUT":
			return update_User(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}
async function update_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { id } = req.query;
	const { name, last_name, second_last_name } = req.body;

	if (!id) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		const user = await Data_User.findOneBy({ id_Data_User: Number(id) });

		if (!user) {
			return res.status(404).json({ message: "El usuario no existe" });
		}

		await Data_User.update(
			{ id_Data_User: Number(id) },
			{ name, last_name, second_last_name },
		);

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se actualizo con exito" });
}
