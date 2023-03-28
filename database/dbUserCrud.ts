import { IUser } from "@/interfaces/user_interface";
import { ModelUser } from "@/models";
import bcrypt from "bcryptjs";
import { db } from ".";

export const getUsers = async (): Promise<IUser | null> => {
	let users;
	try {
		await db.connect();
		users = await ModelUser.user_model.findAll();
		await db.desconect();
		if (!users) {
			return null;
		}
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(users));
};

export const getUserById = async (id_User: String): Promise<IUser | null> => {
	await db.connect();
	let user = await ModelUser.user_model.findOne({
		where: { id_User: Number(id_User) },
		nest: true,
	});
	await db.desconect();
	if (!user?.dataValues) {
		return null;
	}
	return JSON.parse(JSON.stringify(user.dataValues));
};

export const updateUser = async (
	id_User: number,
	email: string,
	password: string,
	name: string,
	last_name: string,
	second_last_name: string,
	type_User: string,
): Promise<IUser | null> => {
	let user;

	const password1 = bcrypt.hashSync(password);

	try {
		await db.connect();
		user = await ModelUser.user_model.findOne({
			where: { id_User: Number(id_User) },
		});

		if (!user) {
			return JSON.parse(JSON.stringify("Usuario no encontrado"));
		}

		await ModelUser.user_model.update(
			{ email, password1, name, last_name, second_last_name, type_User },
			{ where: { id_User: Number(id_User) } },
		);

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(user));
};
