import { IUser } from "@/interfaces/user_interface";
import useSWR, { SWRConfiguration } from "swr";

export const useDataUSer = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IUser[]>(`/api${url}`, config);
	return {
		dataUser: data || [],
		isLoadig: !(data || error),
		isError: error,
	};
};

export const useDataUserByID = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IUser>(`/api${url}`);
	return {
		dataUser: data || null,
		isLoadig: !(data || error),
		isError: error,
	};
};
