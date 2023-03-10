import { AuthProvider } from "@/context/auth";
import { lightTheme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthProvider>
	);
}
