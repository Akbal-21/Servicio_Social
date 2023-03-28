import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useDataFile } from "../../hooks/useDataFile";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", headerAlign: "center", width: 70 },
	{ field: "name", headerName: "Nombre", headerAlign: "center", width: 140 },
	{
		field: "type_file",
		headerName: "Tipo de archivo",
		headerAlign: "center",
		width: 130,
	},
	{
		field: "size_file",
		headerName: "Peso del archivo",
		headerAlign: "center",
		width: 130,
	},
	{
		field: "file",
		headerName: "Archivo",
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

const StudentPage = () => {
	const { dataFile, isLoadig } = useDataFile("/data_user/file/read");
	const rows = dataFile!.map((file) => ({
		id: file.id_file,
		name: file.file_name,
		type_file: file.type_file,
		size_file: file.size_file,
		file: file.file,
	}));

	return (
		<div>
			<div>
				<Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
					Crud de Archivos
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

export default StudentPage;
