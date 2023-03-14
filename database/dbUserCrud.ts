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

export const createUser = async (
	name: string,
	last_name: string,
	second_last_name: string,
): Promise<IData_User | null> => {
	if (name.length < 2) {
		return JSON.parse(JSON.stringify("El nombre debe de ser de 2 caracteres"));
	}

	if (last_name.length < 2) {
		return JSON.parse(
			JSON.stringify("El primer apellido debe de ser de 2 caracteres"),
		);
	}

	if (second_last_name.length < 2) {
		return JSON.parse(
			JSON.stringify("El segundo apellido debe de ser de 2 caracteres"),
		);
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
			return JSON.parse(JSON.stringify("Error al crear al usuario"));
		}
	}

	console.log(dat_user);
	return JSON.parse(JSON.stringify(dat_user));
};

export const getUserById = async (id: String): Promise<IData_User | null> => {
	//let user;
	//if (!id) {
	//	return JSON.parse(JSON.stringify("Usuario no encontrado"));
	//}

	//try {
	await db.connect();
	const user = await data_user.findOne({
		where: { id_Data_User: Number(id) },
	});
	await db.desconect();
	if (!user) {
		return null;
	}
	return JSON.parse(JSON.stringify(user));
	// } catch (error) {
	// if (error instanceof Error) {
	// return JSON.parse(JSON.stringify(error.message));
	// }
	// }
};

export const deletUser = async (
	id: Number,
): Promise<typeof data_user | null> => {
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
