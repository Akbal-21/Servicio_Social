import { UserContext } from "@/context/user_data";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
	name: string;
	last_name: string;
	second_last_name: string;
};

const NewUserPAge = () => {
	const { createNewUser } = useContext(UserContext);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onNewUSer = async ({ name, last_name, second_last_name }: FormData) => {
		setShowError(false);

		const isValidUser = await createNewUser(name, last_name, second_last_name);

		if (isValidUser == null) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}

		router.push("/crud");
	};

	const [showError, setShowError] = useState(false);

	return (
		<form onSubmit={handleSubmit(onNewUSer)} noValidate>
			<Box sx={{ width: 350, padding: "10px 20px" }}>
				<Grid item xs={12} sx={{ textAlign: "center", marginBottom: "10px" }}>
					<Typography variant="h2" component="h2" sx={{ alignItems: "center" }}>
						Nuevo Usuario
					</Typography>
					<Chip
						label="No se puede crear el usuario"
						color="error"
						icon={<ErrorOutline />}
						className="fadeIn"
						sx={{ display: showError ? "flex" : "none" }}
					/>
				</Grid>

				<Grid item xs={12} sx={{ marginTop: "10px" }}>
					<TextField
						label='Nombre'
						variant='outlined'
						fullWidth
						{...register("name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Míniomo 2 caracteres" },
						})}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				</Grid>

				<Grid item xs={12} sx={{ marginTop: "10px" }}>
					<TextField
						label='Primer apellido'
						variant='outlined'
						fullWidth
						{...register("last_name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Míniomo 2 caracteres" },
						})}
						error={!!errors.last_name}
						helperText={errors.last_name?.message}
					/>
				</Grid>
				<Grid item xs={12} sx={{ marginTop: "10px" }}>
					<TextField
						label='Segundo apellido'
						variant='outlined'
						fullWidth
						{...register("second_last_name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Míniomo 2 caracteres" },
						})}
						error={!!errors.second_last_name}
						helperText={errors.second_last_name?.message}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button
						type="submit"
						color="secondary"
						variant="outlined"
						size="large"
						fullWidth
						sx={{ marginTop: "10px" }}
					>
						Ingresar
					</Button>
				</Grid>
			</Box>
		</form>
	);
};

export default NewUserPAge;
