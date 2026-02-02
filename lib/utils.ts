import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PDFParse } from "pdf-parse";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function convertPdfToText(publicUrl: string): Promise<string> {
	const parser = new PDFParse({ url: publicUrl });
	const result = await parser.getText();
	await parser.destroy();
	return result.text;
}
