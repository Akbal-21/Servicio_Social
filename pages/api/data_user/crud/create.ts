/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { Data_User } from "@/database/entities";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			DATA_USER: {
				id_Data_User: number;
				name: string;
				last_name: string;
				second_last_name: string;
			};
	  };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return create_User(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function create_User(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		name1 = "",
		last_name1 = "",
		second_last_name1 = "",
	} = req.body as {
		name1: string;
		last_name1: string;
		second_last_name1: string;
	};

	if (name1.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (last_name1.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (second_last_name1.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	const data_user = new Data_User();
	data_user.name = name1;
	data_user.last_name = last_name1;
	data_user.second_last_name = second_last_name1;
	try {
		await db.connect();

		await data_user.save();

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	const { id_Data_User, name, last_name, second_last_name } = data_user;

	return res.status(200).json({
		DATA_USER: {
			id_Data_User,
			name,
			last_name,
			second_last_name,
		},
	});
}
