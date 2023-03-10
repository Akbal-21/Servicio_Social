import { ssApi } from "@/api";
import { IUser } from "@/interfaces/userLogin";
import { FC, useReducer } from "react";
import { AuthContext, authReducer } from "./";

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children?: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

	const loginUser = async (
		email: string,
		password: string,
	): Promise<boolean> => {
		try {
			const { data } = await ssApi.post("/auth/login", { email, password });
			const { users } = data;
			const { id_User, name, tipo_user } = users;
			dispatch({ type: "[Auth] - Login", payload: users });
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,

				//!Methods
				loginUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
