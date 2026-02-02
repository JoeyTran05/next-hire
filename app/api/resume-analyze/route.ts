import { convertPdfToText } from "@/services/pdf-to-text";
import { NextResponse } from "next/server"; 

export async function POST(request: Request) {
    // Get the pdf file from the request

    // After getting the file, store it onto Supabase File Storage
    
    // After storing, use the convertPdfToText function to convert the file to text
    const pdfText = convertPdfToText(file);

    // Pass the extracted text to an AI model for analysis 
}