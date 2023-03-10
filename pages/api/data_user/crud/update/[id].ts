import { db } from "@/database";
import { data_user } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
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
		const user = await data_user.findOne({
			where: { id_Data_User: Number(id) },
		});

		if (!user) {
			return res.status(404).json({ message: "El usuario no existe" });
		}

		await data_user.update(
			{ name, last_name, second_last_name },
			{ where: { id_Data_User: Number(id) } },
		);
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	return res.status(204).json({ message: "Se actualizo con exito" });
}
