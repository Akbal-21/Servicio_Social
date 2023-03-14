import fs from "fs";

// This code (and entire file) only works server-side
export function getFileExistence(filepath: string) {
	return fs.existsSync(filepath);
}
