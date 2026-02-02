"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "../supabase/admin";

export const uploadResumeToSupabase = async (file: File): Promise<string> => {
	if (file.type !== "application/pdf") {
		throw new Error(
			"Only PDF files are allowed. Detected MIME type: " + file.type,
		);
	}

	const { userId: author } = await auth();

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

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

export const createResume = async (formData: CreateResume) => {
	const { userId: author } = await auth();
	const supabase = createSupabaseClient();

	const file = formData.resume as File;
	if (!file) throw new Error("Resume PDF is required");

	const publicUrl = await uploadResumeToSupabase(file);

	const { data, error } = await supabase
		.from("resumes")
		.insert({
			user_id: author,
			job_title: formData.jobTitle,
			company_name: formData.companyName,
			job_description: formData.jobDescription,
			resume: publicUrl,
		})
		.select();

	if (error || !data) {
		throw new Error(
			`Failed to insert resume into database: ${error?.message || "No data returned"}`,
		);
	}

	return data[0];
};
