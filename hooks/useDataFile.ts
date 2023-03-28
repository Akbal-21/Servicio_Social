import { IFile } from "@/interfaces/file_interface";
import useSWR, { SWRConfiguration } from "swr";

export const useDataFile = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IFile[]>(`/api${url}`, config);
	return {
		dataFile: data || [],
		isLoadig: !(data || error),
		isError: error,
	};
};

export const useDataFileByID = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IFile>(`/api${url}`);
	return {
		dataFile: data || null,
		isLoadig: !(data || error),
		isError: error,
	};
};
