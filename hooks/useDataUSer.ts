import { IData_User } from "@/interfaces";
import useSWR, { SWRConfiguration } from "swr";

export const useDataUSer = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IData_User[]>(`/api${url}`, config);

	return {
		dataUser: data || [],
		isLoadig: !(data || error),
		isError: error,
	};
};

export const useDataUserByID = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IData_User>(`/api${url}`);
	return {
		dataUser: data || null,
		isLoadig: !(data || error),
		isError: error,
	};
};
