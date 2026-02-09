"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { randomUUID } from "crypto";
import { createSupabaseAdmin } from "../supabase/admin";
import { convertPdfToText } from "../utils";
import { generateAnalysis } from "./ai.actions";

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

	if (error) {
		throw new Error(`Failed to insert resume record: ${error.message}`);
	}
	return data[0].id;
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
	const resumeId = await insertResume(formData, author!, publicUrl);

	const resumeText = await convertPdfToText(publicUrl);
	const resumeFeedback = await generateAnalysis(
		formData.jobTitle,
		formData.jobDescription,
		formData.companyName,
		resumeText,
	);
	const resumeFeedbackId = await insertResumeFeedback({
		...resumeFeedback,
		resume_id: resumeId,
	});
	return resumeFeedbackId;
};

export const insertResumeFeedback = async ({
	overall_score,
	ats_score,
	keyword_match_score,
	impact_score,
	readability_score,
	relevance_score,
	consistency_score,
	summary_feedback,
	section_feedback,
	resume_id,
}: ResumeFeedbackParams) => {
	const supabase = createSupabaseClient();

	const { data, error } = await supabase
		.from("resume_results")
		.insert({
			overall_score,
			ats_score,
			keyword_match_score,
			impact_score,
			readability_score,
			relevance_score,
			consistency_score,
			summary_feedback,
			section_feedback,
			resume_id,
		})
		.select();

	if (error || !data) {
		throw new Error(
			`Failed to insert resume feedback: ${error?.message || "No data returned"}`,
		);
	}

	return data[0].id;
};

export const getResumesByUser = async (
	userId: string,
): Promise<Resume[] | null> => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("resumes")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", { ascending: false });

	if (error || !data) {
		console.error("Error fetching resumes:", error);
		return null;
	}
	return data as Resume[];
};

export const getResumeById = async (
	resumeID: string,
): Promise<Resume | null> => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("resumes")
		.select("*")
		.eq("id", resumeID)
		.single();

	if (error) {
		console.error("Error fetching resume data:", error);
		return null;
	}
	return data as Resume;
};
