import { Data } from "@/components/user/Data";
import { getUserById } from "@/database/dbUserCrud";
import { IData_User } from "@/interfaces";
import { GetServerSideProps, NextPage } from "next";

interface Props {
	datUser: IData_User;
}

const UserEntry: NextPage<Props> = ({ datUser }) => {
	return (
		<Data
			id_Data_User={datUser.id_Data_User}
			name={datUser.name}
			last_name={datUser.last_name}
			second_last_name={datUser.second_last_name}
		/>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const { id = "" } = query;

	const datUser = await getUserById(id.toString());
	return {
		props: {
			datUser,
		},
	};
};

export default UserEntry;
