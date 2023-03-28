import { Data } from "@/components/user/Data";
import { getUserById } from "@/database/dbUserCrud";
import { GetServerSideProps, NextPage } from "next";
import { IUser } from "../../interfaces/user_interface";

interface Props {
	datUser: IUser;
}

const UserEntry: NextPage<Props> = ({ datUser }) => {
	//const { dataUser, isLoadig } = useDataUserByID(`/data_user/crud/read/${id}`);
	return (
		<>
			<Data datUser={datUser} />
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

	const datUser = await getUserById(id.toString());
	return {
		props: {
			datUser,
		},
	};
};

export default UserEntry;
