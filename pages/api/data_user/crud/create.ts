import { IData_User } from "../../../../interfaces/dataUser";
/* eslint-disable import/no-anonymous-default-export */
import { db } from "@/database";
import { data_user } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

type Data =
	| {
			message: string;
	  }
	| {
			DATA_USER: {
				name: string;
				last_name: string;
				second_last_name: string;
			};
	  }
	| IData_User;

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
		name = "",
		last_name = "",
		second_last_name = "",
	} = req.body as {
		name: string;
		last_name: string;
		second_last_name: string;
	};

	if (name.length < 2) {
		return res
			.status(404)
			.json({ message: "El nombre debe de ser de 2 caracteres" });
	}

	if (last_name.length < 2) {
		return res
			.status(404)
			.json({ message: "El apellido debe de ser de 2 caracteres" });
	}

	if (second_last_name.length < 2) {
		return res
			.status(404)
			.json({ message: "El segundo apellido debe de ser de 2 caracteres" });
	}
	let dat_user;
	try {
		await db.connect();
		dat_user = await data_user.create({
			name,
			last_name,
			second_last_name,
		});
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		}
	}

	console.log(dat_user);

	return res.status(200).json({
		DATA_USER: {
			name,
			last_name,
			second_last_name,
		},
		//message: "Hola",
	});
}
