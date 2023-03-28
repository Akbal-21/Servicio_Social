import { Box, Button } from "@mui/material";
const AdminPage = () => {
	return (
		<Box>
			<Box display="flex" justifyContent="end" sx={{ m: 2 }}>
				<Button
					variant="contained"
					color="primary"
					sx={{ alignItems: "flex-end" }}
					href="/file"
				>
					Nuevo tipo de archivo
				</Button>
			</Box>
			<Box display="flex" sx={{ m: 5 }}>
				<h1>Tipos de archivos para subir</h1>
			</Box>
		</Box>
	);
};

export default AdminPage;
