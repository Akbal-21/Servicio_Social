import { IData_User } from "../../../../../interfaces/dataUser";
/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { data_user } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| IData_User[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return getUsers(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
	let users;
	try {
		await db.connect();

		users = await data_user.findAll({ raw: true, nest: true });
		console.log(users);

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}
	if (!users) {
		return res.status(404).json({ message: "No hay usuarios" });
	}

	return res.status(200).json(users);
}
