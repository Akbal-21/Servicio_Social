import { UserContext } from "@/context/user_data";
import { dbDataUser } from "@/database";
import { IData_User } from "@/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useMemo, useState } from "react";

interface Props {
	data_user: IData_User;
}

const UserEntry: NextPage<Props> = ({ data_user }) => {
	const router = useRouter();
	const { updateUser, deletUsers } = useContext(UserContext);

	const { name, last_name, second_last_name } = data_user;

	const [nameValue, setNameValue] = useState(name);
	const [last_nameValue, setLast_nameValue] = useState(last_name);
	const [second_lastnameValue, setSecond_lastnameValue] =
		useState(second_last_name);

	const [touched, setTouched] = useState(false);

	const onNameValuChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setNameValue(event.target.value);
	};

	const onLastNameValuChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setLast_nameValue(event.target.value);
	};

	const onSeconLastNameValuChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setSecond_lastnameValue(event.target.value);
	};

	const isNotValidData = useMemo(
		() =>
			(last_nameValue.length <= 0 && touched) ||
			(second_lastnameValue.length <= 0 && touched) ||
			(nameValue.length <= 0 && touched),
		[nameValue, last_nameValue, second_lastnameValue, touched],
	);

	const isNotTrim = useMemo(
		() =>
			nameValue.trim().length === 0 &&
			second_lastnameValue.trim().length === 0 &&
			last_nameValue.trim().length === 0,
		[nameValue, last_nameValue, second_lastnameValue],
	);

	const isNotValid = useMemo(
		() =>
			nameValue.length <= 0 ||
			last_nameValue.length <= 0 ||
			second_lastnameValue.length <= 0,
		[nameValue, second_lastnameValue, last_nameValue],
	);

	const onUpdate = () => {
		if (isNotTrim) {
			return;
		}

		// const updateUSer: IData_User = {
		// ...data_user,
		// name: nameValue,
		// last_name: last_nameValue,
		// second_last_name: second_lastnameValue,
		// };
		//
		// updateUser(updateUSer);
		//router.push("/crud");
	};

	const onDelete = async () => {
		//deletUsers(data_user.id_Data_User);
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
					value={nameValue}
					onChange={onNameValuChanged}
					placeholder="name"
					helperText={isNotValidData && "Ingrese un Nombre"}
					onBlur={() => setTouched(true)}
					error={isNotValidData}
				/>
			</Grid>

			<Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "5px" }}>
				<TextField
					label='Last Name'
					variant='outlined'
					fullWidth
					value={last_nameValue}
					onChange={onLastNameValuChanged}
					autoFocus
					placeholder="last_name"
					helperText={isNotValidData && "Ingrese un Apellido"}
					onBlur={() => setTouched(true)}
					error={isNotValidData}
				/>
			</Grid>

			<Grid item xs={12} sx={{ marginTop: "20px", marginBottom: "5px" }}>
				<TextField
					label='Second Last Name'
					variant='outlined'
					fullWidth
					value={second_lastnameValue}
					onChange={onSeconLastNameValuChanged}
					placeholder="second_last_name"
					helperText={isNotValidData && "Ingrese un Apellido"}
					onBlur={() => setTouched(true)}
					error={isNotValidData}
				/>
			</Grid>

			<Grid item xs={12}>
				<Stack spacing={1} sx={{ width: 1, py: 2 }}>
					<Button
						variant="contained"
						size="small"
						color="success"
						startIcon={<EditIcon />}
						onClick={onUpdate}
						disabled={isNotValid}
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
		</Box>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };
	console.log(id);

	const data_user = await dbDataUser.getUserById(id);
	console.log(data_user);

	return {
		props: {
			data_user,
		},
	};
};

export default UserEntry;
