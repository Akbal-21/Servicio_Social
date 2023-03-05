/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { pool } from "@/database/database";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2/promise";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			users: {
				id_User: number;
				name: string;
				tipo_user: boolean;
			};
	  };

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const { method } = req;

	switch (method) {
		case "POST":
			return loginUser(req, res);
		default:
			res.status(404).json({ message: "Bad request" });
	}
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email = "", password = "" } = req.body;

	const query1 = "SELECT * FROM `User` WHERE correo_User=?";

	await db.connect();

	const response1 = await pool.query(query1, [email]);
	const resp1 = (<RowDataPacket>response1)[0];

	if (!resp1[0]) {
		return res.status(404).json({ message: "User not found" });
	}

	const { id_User, name, contra_User, tipo_user } = resp1[0];

	if (!bcrypt.compareSync(password, contra_User)) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({
		users: {
			id_User,
			name,
			tipo_user,
		},
	});
};
