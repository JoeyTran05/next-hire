"use server";

import { createSupabaseClient } from "../supabase";

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
