import { IUser } from "@/interfaces/userLogin";
import { AuthState } from "./AuthProvider";

type AuthActionType =
	| { type: "[Auth] - Login"; payload: IUser }
	| { type: "[Auth] - Logout" };

export const authReducer = (
	state: AuthState,
	action: AuthActionType,
): AuthState => {
	switch (action.type) {
		case "[Auth] - Login":
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
			};

		case "[Auth] - Login":
			return {
				...state,
				isLoggedIn: false,
				user: undefined,
			};

		default:
			return state;
	}
};
