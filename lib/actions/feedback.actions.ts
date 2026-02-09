"use server";

import { createSupabaseClient } from "../supabase";
import { generateInterviewFeedback } from "./ai.actions";

// Get resume feedback data based on resume ID
export const getResumeFeedbackByID = async (
	resumeID: string,
): Promise<ResumeFeedbackParams | null> => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("resume_results")
		.select("*")
		.eq("resume_id", resumeID)
		.single();

	if (error) {
		console.error("Error fetching resume feedback:", error);
		return null;
	}
	return data as ResumeFeedbackParams;
};

export const getResumePDF = async (resumeID: string) => {
	const supabase = createSupabaseClient();
	const { data, error } = await supabase
		.from("resumes")
		.select("resume")
		.eq("id", resumeID)
		.single();

	if (error) {
		console.error("Error fetching resume PDF:", error);
		return null;
	}
	return data;
};

export const insertInterviewFeedback = async ({
	userId,
	resumeId,
	transcript,
}: InsertInterviewFeedbackParams) => {
	const supabase = createSupabaseClient();

	const feedback = await generateInterviewFeedback(transcript);

	const { data, error } = await supabase
		.from("interview_results")
		.insert({
			resume_id: resumeId,
			user_id: userId,
			...feedback,
		})
		.select();

	if (error || !data) {
		throw new Error(
			`Failed to insert interview feedback: ${error?.message || "No data returned"}`,
		);
		// return { success: false, feedbackId: "" };
	}

	return { success: true, feedbackId: data[0].id };
};
