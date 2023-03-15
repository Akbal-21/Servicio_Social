import { IData_User } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
	Users: IData_User[];
	user?: IData_User;

	//*Methods
	updateUser: (
		{ id_Data_User, name, last_name, second_last_name }: IData_User,
		showSnackbar?: boolean,
	) => Promise<void>;

	deletUser: ({ id_Data_User }: IData_User, showSnackbar?: boolean) => void;
	createNewUser: (
		name: string,
		last_name: string,
		second_last_name: string,
	) => Promise<{
		hasError: boolean;
		message?: string;
	}>;
}

export const UserContext = createContext({} as ContextProps);
