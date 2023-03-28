/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { ModelFIle } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return updateFile(req, res);

		default:
			return res.status(404).json({ message: "Bad request" });
	}
}

async function updateFile(req: NextApiRequest, res: NextApiResponse<Data>) {
	const file = req.body as { file: Blob };

	if (!file) {
		return res.status(404).json({ message: "Debe de haber un archivo" });
	}

	try {
		await db.connect();
		await ModelFIle.file_model.update(
			{
				file: file,
			},
			{ where: { id_file: 6 } },
		);
		await db.desconect();
		return res.status(202).end();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
}
