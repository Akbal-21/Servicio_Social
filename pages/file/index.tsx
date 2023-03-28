import { ssApi } from "@/api";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
	file_name: string;
	type_file: string;
	size_file: number;
	file: Blob[];
	userIdUser: number;
};

const FilePage = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FormData>();

	//const { user } = useContext(AuthContext);

	useEffect(() => {
		watch((value, { name, type }) => {
			if (name === "file") {
				const file1 = value.file!;
				const size = file1[0]?.size!;
				const type = file1[0]?.type!;
				console.log({ size, type });
				setValue("size_file", size);
				setValue("type_file", type);
				setValue("userIdUser", 1);
			}
		});

		return () => {};
	}, [watch, setValue]);

	const newFile = async (form: FormData) => {
		const { name } = form.file[0];
		setValue("file_name", name);
		const { userIdUser, size_file, type_file, file_name } = form;
		console.log(form.file_name);

		//console.log(name, form.size_file, form.type_file, userIdUser);
		try {
			const { data } = await ssApi({
				url: "/data_user/file",
				method: "POST",
				data: {
					userIdUser,
					size_file,
					type_file,
					file_name,
				},
			});
			const dat = await ssApi({
				url: "/data_user/file/insertfile",
				method: "POST",
				data: form.file,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(newFile)}>
			<Box
				display="flex"
				sx={{ m: "5%", borderRadius: "6px" }}
				boxShadow={3}
				alignContent="center"
				alignItems="center"
				textAlign="center"
				bgcolor="-moz-initial"
				width="20%"
				height="20%"
			>
				<Grid sx={{ marginTop: "10px" }}>
					<Grid m={2}>
						<TextField
							type="file"
							variant='outlined'
							fullWidth
							{...register("file", {
								required: "Escoja un archivo",
							})}
							error={!!errors.file}
							helperText={errors.file?.message}
						/>
					</Grid>

					<Grid m={2}>
						<Button type='submit' color="success" variant="contained">
							Ingresar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</form>
	);
};

export default FilePage;
