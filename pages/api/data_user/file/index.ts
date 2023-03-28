/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { ModelFIle } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| { id_file: number };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return createFile(req, res);

		default:
			return res.status(404).json({ message: "Bad request" });
	}
}

async function createFile(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { userIdUser, size_file, type_file, file_name } = req.body as {
		userIdUser: number;
		file_name: string;
		size_file: number;
		type_file: string;
	};

	if (!(type_file || size_file || userIdUser || file_name)) {
		return res.status(404).json({ message: "Debe de haber un archivo" });
	}

	try {
		await db.connect();
		await ModelFIle.file_model.create({
			size_file,
			type_file,
			userIdUser,
			file_name,
		});
		const data = await ModelFIle.file_model.findOne({
			order: [["id_file", "DESC"]],
			limit: 1,
		});
		await db.desconect();
		const { id_file } = data?.dataValues;
		console.log(id_file);
		// const { id_file } = id?.dataValues;
		return res.status(200).json({ id_file });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
}
