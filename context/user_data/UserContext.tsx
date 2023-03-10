import { IData_User } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
	Users: IData_User[];

	//*Methods
	updateUser: (
		{ id_Data_User, name, last_name, second_last_name }: IData_User,
		showSnackbar?: boolean,
	) => Promise<void>;
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	deletUsers: (id: number) => Promise<any>;
}

export const UserContext = createContext({} as ContextProps);
