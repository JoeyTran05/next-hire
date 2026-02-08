import { createSupabaseClient } from "../supabase";
import { convertPdfToText } from "../utils";
import { generateInterviewQuestions } from "./ai.actions";

// Get resume data based on resume ID
export const getResumekByID = async (resumeID: string) => {
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
    return data;
};

// Generate interview questions
export const generateInterview = async (resumeID: string, type: string, difficulty: string, amount: number) => {
    // Get resume data
    const resumeData = await getResumekByID(resumeID);

    if (resumeData) {
        // Turn pdf to raw text
        const resumeText = await convertPdfToText(resumeData.resume);

        // Generate interview questions
        const interviewQuestions = await generateInterviewQuestions(
            type,
            resumeData.job_description,
            resumeData.job_title,
            difficulty,
            amount,
            resumeText
        )
        console.log("Interview questions generated:", interviewQuestions);
        return interviewQuestions;
    }
    return null;
    
};