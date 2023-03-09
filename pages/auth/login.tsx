import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
	email: string;
	password: string;
};

const Loginpage = () => {
	const { loginUser } = useContext(AuthContext);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);

		const isValidLogin = await loginUser(email, password);

		if (!isValidLogin) {
			setShowError(true);

			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}

		router.push("/");
	};

	const [showError, setShowError] = useState(false);

	return (
		<AuthLayout title='Login'>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
				<Box sx={{ width: 350, padding: "10px 20px" }}>
					<Grid item xs={12} sx={{ textAlign: "center", marginBottom: "10px" }}>
						<Typography
							variant="h2"
							component="h2"
							sx={{ alignItems: "center" }}
						>
							Iniciar Sesión
						</Typography>
						<Chip
							label="No reconocemos ese usuario / contraseña"
							color="error"
							icon={<ErrorOutline />}
							className="fadeIn"
							sx={{ display: showError ? "flex" : "none" }}
						/>
					</Grid>

					<Grid item xs={12} sx={{ marginTop: "5px" }}>
						<TextField
							type='emai'
							label='Correo'
							variant='outlined'
							fullWidth
							{...register("email", {
								required: "Este campo es requerido",
								validate: validations.isEmail,
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</Grid>

					<Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "5px" }}>
						<TextField
							type='password'
							label='Contraseña'
							variant='outlined'
							fullWidth
							{...register("password", {
								required: "Este campo es requerido",
								minLength: { value: 6, message: "Míniomo 6 caracteres" },
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					</Grid>

					<Grid item xs={12}>
						<Button
							type="submit"
							color="secondary"
							variant="outlined"
							size="large"
							fullWidth
						>
							Ingresar
						</Button>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default Loginpage;
