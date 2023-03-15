import { Data } from "@/components/user/Data";
import { GetServerSideProps, NextPage } from "next";
import { useDataUserByID } from "../../hooks/useDataUSer";

interface Props {
	id: string;
}

const UserEntry: NextPage<Props> = ({ id }) => {
	const { dataUser, isLoadig } = useDataUserByID(`/data_user/crud/read/${id}`);
	return (
		<>
			{isLoadig ? (
				<h1>Cargando ...</h1>
			) : (
				<Data
					id_Data_User={dataUser.id_Data_User}
					name={dataUser.name}
					last_name={dataUser.last_name}
					second_last_name={dataUser.second_last_name}
				/>
			)}
		</>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const { id = "" } = query as { id: string };

	//const datUser = await getUserById(id.toString());
	return {
		props: {
			id,
		},
	};
};

export default UserEntry;
