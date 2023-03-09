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

export const delletUsers = async (id: number): Promise<IData_User | null> => {
	if (!id) {
		return JSON.parse(JSON.stringify("Usuario no encontrado"));
	}
	try {
		await db.connect();
		await Data_User.delete({ id_Data_User: Number(id) });
		await db.desconect();
	} catch (error) {
		if (error instanceof Error) {
			return JSON.parse(JSON.stringify(error.message));
		}
	}
	return JSON.parse(JSON.stringify("Usuario eliminado"));
};
