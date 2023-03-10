import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		background: {
			default: "rgb(192, 192, 192)",
		},
		primary: {
			main: "#177188",
		},
		secondary: {
			main: "#196f85",
		},
		error: {
			main: red.A400,
		},
	},

	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
			},
			styleOverrides: {},
		},
	},
});
