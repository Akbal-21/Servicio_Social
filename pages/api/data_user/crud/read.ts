import { db } from "@/database";
import { Data_User } from "@/database/entities";
import type { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable import/no-anonymous-default-export */
type Data = {
	message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getUser(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
	let users;

	try {
		await db.connect();

		users = await Data_User.find();

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	if (!users) {
		return res.status(404).json({ message: "No hay usuarios" });
	}

	return res.status(200).json({
		users,
	});
}
