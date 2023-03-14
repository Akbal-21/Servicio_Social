import { ssApi } from "@/api";
import { UserContext, userReducer } from "./";
//import { deletUsers } from "@/database/dbUserCrud";
import { IData_User } from "@/interfaces";
import { useSnackbar } from "notistack";
import { FC, useReducer } from "react";

export interface UserState {
	Users: IData_User[];
}

const User_INITIAL_STATE: UserState = {
	Users: [],
};

interface Props {
	children?: JSX.Element | JSX.Element[];
}

export const UserProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, User_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();

	const updateUser = async (
		{ id_Data_User, name, last_name, second_last_name }: IData_User,
		showSnackbar = false,
	) => {
		try {
			const { data } = await ssApi.put<IData_User>(
				`/data_user/crud/${id_Data_User}`,
				{ name, last_name, second_last_name },
			);
			dispatch({ type: "[User] - User-Update", payload: data });

			if (showSnackbar)
				enqueueSnackbar("Usuario actualizada", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
		} catch (error) {
			console.log({ error });
		}
	};

	const createNewUser = async (
		name: string,
		last_name: string,
		second_last_name: string,
		showSnackbar = false,
	) => {
		try {
			const { data } = await ssApi.post<IData_User>("/data_user/crud/create", {
				name,
				last_name,
				second_last_name,
			});

			dispatch({ type: "[User] - Create-New-User", payload: data });
			if (showSnackbar)
				enqueueSnackbar("Se creo el usuario correctamente", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
		} catch (error) {}
	};

	const deletUser = ({ id_Data_User }: IData_User, showSnackbar = false) => {
		try {
			ssApi.delete(`/data_user/crud/${id_Data_User}`);
			dispatch({ type: "[User] - Delet-User" });

			if (showSnackbar)
				enqueueSnackbar("Usuario eliminado", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<UserContext.Provider
			value={{
				...state,

				// *Mthods
				updateUser,
				deletUser,
				createNewUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
