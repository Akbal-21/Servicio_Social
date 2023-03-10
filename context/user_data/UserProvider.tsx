import { ssApi } from "@/api";
import { deletUsers } from "@/database/dbUserCrud";
import { IData_User } from "@/interfaces";
import { useSnackbar } from "notistack";
import { FC, useReducer } from "react";
import { UserContext, userReducer } from "./";

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
				deletUsers,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
