import { createSupabaseClient } from "../supabase";

// Get resume feedback data based on resume ID
export const getResumeFeedbackByID = async (resumeID: string) => {
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
    return data;
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
}
