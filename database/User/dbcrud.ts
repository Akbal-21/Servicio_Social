import { db } from "@/database";
import { Data_User } from "@/database/entities";
import { IData_User } from "@/interfaces";

export const getUsers = async (): Promise<IData_User | null> => {
	await db.connect();
	const users = await Data_User.find();
	await db.desconect();
	if (!users) {
		return null;
	}
	return JSON.parse(JSON.stringify(users));
};

export const getUserById = async (id: string): Promise<IData_User | null> => {
	let user;
	if (!id) {
		return JSON.parse(JSON.stringify("Usuario no encontrado"));
	}

	try {
		await db.connect();
		user = await Data_User.findOneBy({ id_Data_User: Number(id) });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(user));
};

export const deletUsers = async (id: number) => {
	if (!id) {
		return JSON.parse(JSON.stringify("Usuario no encontrado"));
	}
	try {
		await db.connect();
		await Data_User.delete({ id_Data_User: id });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify("Usuario eliminado"));
};

export const updateUser = async (
	id: number,
	name: string,
	last_name: string,
	second_last_name: string,
): Promise<IData_User | null> => {
	let user;
	try {
		await db.connect();
		user = await Data_User.findOneBy({ id_Data_User: Number(id) });

		if (!user) {
			return JSON.parse(JSON.stringify("Usuario no encontrado"));
		}

		await Data_User.update(
			{ id_Data_User: Number(id) },
			{ name, last_name, second_last_name },
		);

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(user));
};
