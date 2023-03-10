import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { FC } from "react";

interface Props {
	id: number;
}

const Delete: FC<Props> = ({ id }) => {
	console.log({ id });
	return (
		<div>
			<Button
				variant="outlined"
				size="small"
				color="success"
				startIcon={<EditIcon />}
				sx={{ marginRight: "5px", marginLeft: "5px" }}
			>
				Edit
			</Button>
			<Button
				variant="outlined"
				size="small"
				color="error"
				startIcon={<DeleteIcon />}
			>
				Delete
			</Button>
		</div>
	);
};

export default Delete;
