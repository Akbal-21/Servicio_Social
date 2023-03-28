import { db } from "@/database";
import { ModelUser } from "@/models";
import bcrypt from "bcryptjs";
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
				password: string;
				name: string;
				last_name: string;
				second_last_name: string;
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
	const { email = "", password = "" } = req.body;

	await db.connect();

	const userLog = await ModelUser.user_model.findOne({
		where: { email },
		nest: true,
	});

	await db.desconect();

	if (!userLog) {
		return res.status(404).json({ message: "User not found" });
	}

	if (!bcrypt.compareSync(password, userLog.dataValues.password!)) {
		return res.status(404).json({ message: "User not found" });
	}
	const { id_User, type_User, name, last_name, second_last_name } =
		userLog.dataValues;

	return res.status(200).json({
		users: {
			id_User,
			email,
			password,
			name,
			last_name,
			second_last_name,
			type_User,
		},
	});
};
