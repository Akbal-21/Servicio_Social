import { db } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

import "../../models/data_user.ts";
import "../../models/user.ts";

type Data = { message: string } | { message1: string };

export default function async(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return date(req, res);

		default:
			res.status(400).json({ message: "Bad Request" });
	}
}

const date = async (req: NextApiRequest, res: NextApiResponse) => {
	//const { pool } = db;

	await db.connect();
	await db.db.sync();
	await db.desconect();

	return res.status(200).json({ message1: "Hola mundo" });
};
