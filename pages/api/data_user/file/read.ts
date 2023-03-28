/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { ModelFIle } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getUsers(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
	let file;
	try {
		await db.connect();

		file = await ModelFIle.file_model.findAll({ raw: true, nest: true });

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
	if (!file) {
		return res.status(404).json({ message: "No hay usuarios" });
	}

	return res.status(200).json(file);
}
