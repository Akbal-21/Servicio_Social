import { AuthContext } from "@/context/auth";
import { Inter } from "next/font/google";
import { useContext } from "react";
import AdminPage from "./admin";
import StudentPage from "./student";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { user } = useContext(AuthContext);
	return (
		<>
			<div>
				{user?.type_User === "admin" ? (
					<>
						<AdminPage />
					</>
				) : (
					<>
						<StudentPage />
					</>
				)}
			</div>
		</>
	);
}
