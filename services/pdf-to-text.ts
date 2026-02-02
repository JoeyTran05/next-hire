import {PDFParse} from "pdf-parse";

export async function convertPdfToText(file: Buffer): Promise<string> {
    const parser = new PDFParse(file);
    const result = await parser.getText();
    return result.text;
}
