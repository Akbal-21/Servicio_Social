import { db } from "@/database";
import { User } from "@/database/entities";
import bcrypt from "bcryptjs";
/* eslint-disable import/no-anonymous-default-export */
//import { pool } from "@/database/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			users: {
				id_User: number;
				email: string;
				type_User: string;
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
	const { email1 = "", password = "" } = req.body;

	await db.connect();

	const user = await User.findOne({ where: { email: email1 } });

	await db.desconect();

	console.log(user);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const { id_User, email, type_User } = user;

	if (!bcrypt.compareSync(password, user.password)) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({
		users: {
			id_User,
			email,
			type_User,
		},
	});
};
