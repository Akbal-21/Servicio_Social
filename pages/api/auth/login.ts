import { db } from "@/database";
import { user } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
/* eslint-disable import/no-anonymous-default-export */
//import { pool } from "@/database/database";

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
	const { email1 = "" } = req.body;
	// password = ""
	await db.connect();

	const userLog = await user.findOne({ where: { email: email1 } });

	await db.desconect();

	console.log(userLog);

	if (!userLog) {
		return res.status(404).json({ message: "User not found" });
	}

	console.log({ userLog });

	//const { id_User, email, type_User } = user;

	// if (!bcrypt.compareSync(password, user.password)) {
	// return res.status(404).json({ message: "User not found" });
	// }

	return res.status(200).json({
		// users: {
		// id_User,
		// email,
		// type_User,
		// },
		message: "Hola",
	});
};
