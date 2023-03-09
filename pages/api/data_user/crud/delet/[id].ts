import { db } from "@/database";
import { Data_User } from "@/database/entities";
/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "DELETE":
			return delet_User(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}
async function delet_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	//const { id } = req.query;
	let { id } = req.query;

	if (!id) {
		return res.status(404).json({ message: "Debe de especificar el usuario" });
	}

	try {
		await db.connect();
		await Data_User.delete({ id_Data_User: Number(id) });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se elimino con exito" });
}
