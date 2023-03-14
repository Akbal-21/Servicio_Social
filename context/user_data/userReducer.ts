import { IData_User } from "@/interfaces";
import { UserState } from "./";

type UserActionType =
	| { type: "[User] - User-Update"; payload: IData_User }
	| { type: "[User] - Create-New-User"; payload: IData_User }
	| { type: "[User] - Delet-User" };

export const userReducer = (
	state: UserState,
	action: UserActionType,
): UserState => {
	switch (action.type) {
		case "[User] - User-Update":
			return {
				...state,
				Users: state.Users.map((user) => {
					if (user.id_Data_User === action.payload.id_Data_User) {
						user.name = action.payload.name;
						user.last_name = action.payload.last_name;
						user.second_last_name = action.payload.second_last_name;
					}
					return user;
				}),
			};

		case "[User] - Create-New-User":
			return {
				...state,
				Users: [...state.Users, action.payload],
			};

		case "[User] - Delet-User":
			return {
				...state,
			};

		default:
			return state;
	}
};
