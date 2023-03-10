import "@/styles/globals.css";
import { lightTheme } from "@/themes/";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "reflect-metadata";
import { AuthProvider } from "../context";

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
