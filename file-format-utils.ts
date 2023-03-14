// file-format-utils.ts

// This code works fine on both the server AND the client
export function formatResult(fileExistsResult: boolean) {
	return fileExistsResult ? "Yes, file exists" : "No, file does not exist";
}
