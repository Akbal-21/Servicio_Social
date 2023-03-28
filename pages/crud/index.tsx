import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useDataUSer } from "../../hooks/useDataUSer";

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
		field: "email",
		headerName: "Email",
		headerAlign: "center",
		width: 140,
	},
	{
		field: "type_user",
		headerName: "Tipo de usuario",
		headerAlign: "center",
		width: 70,
	},
	{
		field: "actions",
		headerName: "Actions",
		headerAlign: "center",
		renderCell: ({ row }: GridRenderCellParams) => {
			return (
				<div>
					<Button
						variant="outlined"
						size="small"
						color="success"
						startIcon={<EditIcon />}
						sx={{ marginRight: "5px", marginLeft: "5px" }}
						href={`/crud/${row.id_User}`}
					>
						Editar
					</Button>
				</div>
			);
		},
		width: 250,
	},
];

const CRUD_User_Page = () => {
	const { dataUser, isLoadig } = useDataUSer("/data_user/crud/read");
	const rows = dataUser!.map((user) => ({
		id: user.id_User,
		email: user.email,
		type_user: user.type_User,
		name: user.name,
		last_name: user.last_name,
		second_last_name: user.second_last_name,
	}));

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
						<div
							style={{
								alignContent: "flex-end",
								marginBottom: "5px",
							}}
						>
							<Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
								<Button
									variant="contained"
									color="primary"
									sx={{ alignItems: "flex-end" }}
									href="/crud/newUser"
								>
									Nuevo Usuario
								</Button>
							</Box>
						</div>
						{isLoadig ? (
							<h1>Cargando ...</h1>
						) : (
							<DataGrid
								sx={{ alignItems: "normal", textAlign: "center" }}
								rows={rows}
								columns={columns}
							/>
						)}
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default CRUD_User_Page;
