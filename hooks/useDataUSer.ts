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
