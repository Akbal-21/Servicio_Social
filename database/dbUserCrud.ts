import { IData_User } from "@/interfaces";
import { data_user } from "@/models";
import { db } from ".";

export const getUsers = async (): Promise<IData_User | null> => {
	let users;
	try {
		await db.connect();
		users = await data_user.findAll();
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

export const getUserById = async (id: string): Promise<IData_User | null> => {
	let user;
	if (!id) {
		return JSON.parse(JSON.stringify("Usuario no encontrado"));
	}

	try {
		await db.connect();
		user = await data_user.findOne({ where: { id_Data_User: Number(id) } });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(user));
};

export const deletUser = async (id: Number) => {
	if (!id) {
		return JSON.parse(JSON.stringify("Usuario no encontrado"));
	}
	try {
		await db.connect();
		await data_user.destroy({ where: { id_Data_User: id } });
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
		user = await data_user.findOne({ where: { id_Data_User: Number(id) } });

		if (!user) {
			return JSON.parse(JSON.stringify("Usuario no encontrado"));
		}

		await data_user.update(
			{ name, last_name, second_last_name },
			{ where: { id_Data_User: Number(id) } },
		);

		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify(user));
};
