import { ssApi } from "@/api";
import { validations } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "../../interfaces/user_interface";

interface Props {
	datUser: IUser;
}

type FormData = {
	id_User: number;
	email: string;
	password: string;
	name: string;
	last_name: string;
	second_last_name: string;
	type_User: string;
};

export const Data: FC<Props> = ({ datUser }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: datUser,
	});

	const [isSaving, setIsSaving] = useState(false);
	const router = useRouter();

	const onDelete = async () => {
		await ssApi({
			method: "DELETE",
			url: "/data_user/crud",
			data: datUser.id_User,
		});

		router.push("/crud");
	};

	const onUpdate = async (form: FormData) => {
		console.log(form);

		if ((form.name || form.last_name || form.second_last_name).length <= 2) {
			return alert("Mínimo dos letras");
		}

		setIsSaving(true);

		try {
			const { data } = await ssApi({
				url: "/data_user/crud",
				method: "PUT",
				data: form,
			});

			console.log({ data });
		} catch (error) {
			setIsSaving(false);
		}
		router.push("/crud");
	};

	return (
		<Box
			sx={{
				width: 350,
				padding: "10px 20px",
				marginLeft: "20%",
				marginRight: "20%",
				marginTop: "8%",
			}}
		>
			<form onSubmit={handleSubmit(onUpdate)}>
				<Grid item xs={12} sx={{ textAlign: "center", marginBottom: "10px" }}>
					<Typography variant="h2" component="h2" sx={{ alignItems: "center" }}>
						Entry User
					</Typography>
				</Grid>
				<Grid item xs={12} sx={{ marginTop: "5px" }}>
					<TextField
						label='Name'
						variant='outlined'
						fullWidth
						{...register("name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Mínimo 2 caracteres" },
						})}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: "10px" }}>
					<TextField
						label='Primer Apellido'
						variant='outlined'
						fullWidth
						{...register("last_name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Mínimo 2 caracteres" },
						})}
						error={!!errors.last_name}
						helperText={errors.last_name?.message}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: "10px" }}>
					<TextField
						label='Segundo Apellido'
						variant='outlined'
						fullWidth
						{...register("second_last_name", {
							required: "Este campo es requerido",
							minLength: { value: 2, message: "Mínimo 2 caracteres" },
						})}
						error={!!errors.name}
						helperText={errors.second_last_name?.message}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: "10px" }}>
					<TextField
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

				<Grid item xs={12} sx={{ marginTop: "10px" }}>
					<select
						{...register("type_User", {
							required: "Este campo es requerido",
						})}
					>
						<option value="admin">Admin</option>
						<option value="teacher">Maestro</option>
						<option value="student">Estudiante</option>
					</select>
				</Grid>

				<Grid item xs={12}>
					<Stack spacing={1} sx={{ width: 1, py: 2 }}>
						<Button
							variant="contained"
							size="small"
							color="success"
							startIcon={<EditIcon />}
							type="submit"
						>
							Save
						</Button>
						<Button
							variant="contained"
							size="small"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={onDelete}
						>
							Delete
						</Button>
					</Stack>
				</Grid>
			</form>
		</Box>
	);
};
