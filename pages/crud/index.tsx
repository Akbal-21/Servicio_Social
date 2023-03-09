import { dbData_User } from "@/database";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetServerSideProps, NextPage } from "next";
import { IData_User } from "../../interfaces/data_user";

const handleSubmit = (e: number) => {
	console.log(e);
};

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", headerAlign: "center", width: 70 },
	{ field: "name", headerName: "Nombre", headerAlign: "center", width: 140 },
	{
		field: "last_name",
		headerName: "Primer Apellido",
		headerAlign: "center",
		width: 130,
	},
	{
		field: "second_last_name",
		headerName: "Segundo Apellido",
		headerAlign: "center",
		width: 130,
	},
	{
		field: "update",
		headerName: "Actualizar",
		headerAlign: "center",
		renderCell: (params: GridRenderCellParams) => {
			return (
				<Button
					variant="contained"
					endIcon={<DriveFolderUploadIcon />}
					onClick={() => {
						handleSubmit(params.row.id);
					}}
				>
					Actualizar
				</Button>
			);
		},
		width: 200,
	},
	{
		field: "delet",
		headerName: "Eliminar",
		headerAlign: "center",
		renderCell: (params: GridRenderCellParams) => {
			return (
				<Button
					variant="outlined"
					startIcon={<DeleteIcon />}
					onClick={() => {
						handleSubmit(params.row.id);
					}}
				>
					Delete
				</Button>
			);
		},
		width: 200,
	},
];

interface Props {
	data_user: IData_User[];
}

const CRUD_User_Page: NextPage<Props> = ({ data_user }) => {
	const rows = data_user.map((user) => ({
		id: user.id_Data_User,
		name: user.name,
		last_name: user.last_name,
		second_last_name: user.second_last_name,
	}));

	console.log({ data_user });
	return (
		<div>
			<div>
				<Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
					Crud de Usuarios
				</Typography>
			</div>
			<div
				style={{
					height: 400,
					width: "86%",
					//placeContent: "center",
					marginLeft: "7%",
					marginRight: "7%",
				}}
			>
				<Grid container className="fadeIn">
					<Grid item xs={12} sx={{ height: 500, width: "80%" }}>
						<DataGrid
							sx={{ alignItems: "normal", textAlign: "center" }}
							rows={rows}
							columns={columns}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const data_user = await dbData_User.getUsers();
	console.log(data_user);

	return {
		props: {
			data_user,
		},
	};
};

export default CRUD_User_Page;
