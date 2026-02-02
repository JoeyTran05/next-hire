"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { randomUUID } from "crypto";
import { createSupabaseAdmin } from "../supabase/admin";
import { convertPdfToText } from "../utils";

export const uploadResumeToSupabase = async (
	buffer: Buffer,
	author: string,
): Promise<string> => {
	const supabaseAdmin = createSupabaseAdmin();
	const filePath = `resumes/${author}/${randomUUID()}.pdf`;

	const { data, error } = await supabaseAdmin.storage
		.from("resumes")
		.upload(filePath, buffer, {
			cacheControl: "3600",
			upsert: false,
			contentType: "application/pdf",
		});

	if (error) {
		throw new Error(`Failed to upload file: ${error.message}`);
	}

	const { data: publicUrlData } = supabaseAdmin.storage
		.from("resumes")
		.getPublicUrl(data.path);

	if (!publicUrlData.publicUrl) {
		throw new Error("Failed to retrieve public URL for the uploaded file");
	}

	return publicUrlData.publicUrl;
};

export const insertResume = async (
	formData: CreateResume,
	author: string,
	publicUrl: string,
) => {
	const supabase = createSupabaseClient();

	const { error } = await supabase.from("resumes").insert({
		user_id: author,
		job_title: formData.jobTitle,
		company_name: formData.companyName,
		job_description: formData.jobDescription,
		resume: publicUrl,
	});

	if (error) {
		throw new Error(`Failed to insert resume record: ${error.message}`);
	}
};

export const analyzeResume = async (formData: CreateResume) => {
	const { userId: author } = await auth();
	const file = formData.resume as File;
	if (!file) throw new Error("Resume PDF is required");

	if (file.type !== "application/pdf") {
		throw new Error(
			"Only PDF files are allowed. Detected MIME type: " + file.type,
		);
	}
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const publicUrl = await uploadResumeToSupabase(buffer, author!);
	insertResume(formData, author!, publicUrl);

	const resume_text = convertPdfToText(publicUrl);
	return resume_text;
};
