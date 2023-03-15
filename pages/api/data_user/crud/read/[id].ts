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
			return getUserById(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function getUserById(req: NextApiRequest, res: NextApiResponse) {
	const { id = " " } = req.query;
	let user;
	//let userData;
	if (!id) {
		return res.status(404).json({ message: "ID No valido" });
	}

	try {
		await db.connect();
		user = await data_user.findOne({
			where: { id_Data_User: Number(id) },
			raw: true,
			nest: true,
		});
		if (!user) {
			return null;
		}

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}

	console.log({ user });
	return res.status(200).json(user);
}
