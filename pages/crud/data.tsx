import { FC } from "react";
import { IData_User } from "../../interfaces/dataUser";

interface Props {
	dat: IData_User;
}
const DataPage: FC<Props> = ({ dat }) => {
	console.log(dat);
	return (
		<div>
			<h1>Data Page</h1>
			Hola mundo
		</div>
	);
};

export default DataPage;
