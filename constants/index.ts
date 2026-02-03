import { z } from "zod";

export const resumeFormSchema = z.object({
	jobTitle: z
		.string()
		.min(5, "Job title must be at least 5 characters.")
		.max(32, "Job title must be at most 32 characters."),
	companyName: z
		.string()
		.min(2, "Company name must be at least 2 characters.")
		.max(32, "Company name must be at most 32 characters."),
	jobDescription: z
		.string()
		.min(20, "Description must be at least 20 characters.")
		.max(1000, "Description must be at most 100 characters."),
	resume: z
		.instanceof(File, { message: "Resume is not uploaded." })
		.refine((file) => file && file.size <= 5 * 1024 * 1024, {
			message: "Resume must be less than 5MB.",
		}),
});

export const resumeFeedbackSchema = z.object({
	overall_score: z.number(),
	ats_score: z.number(),
	keyword_match_score: z.number(),
	impact_score: z.number(),
	readability_score: z.number(),
	relevance_score: z.number(),
	consistency_score: z.number(),
	summary_feedback: z.string(),
	section_feedback: z
		.array(
			z.object({
				name: z.enum(["Experience", "Education", "Skills", "Projects"]),
				score: z.number(),
				comment: z.string(),
			}),
		)
		.length(4),
});

export const resumeFeedbackPrompt = (
	jobTitle: string,
	jobDescription: string,
	companyName: string,
	resumeText: string,
) => {
	const prompt = `You are an expert in ATS (Applicant Tracking System) and resume analysis.
                Please analyze the following resume and suggest how to improve it.
				Resume text: 
				${resumeText}

                The rating can be low if the resume is bad.
                Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
                If there is a lot to improve, don't hesitate to give low scores. This is to help the users to improve their resumes.
                If available, use the job description for the job user is applying for to give more tailored suggestions and feedbacks.
                The job title is: ${jobTitle}.
                The job description is: ${jobDescription}.
                Provide the feedback using the following format:
                ${resumeFeedbackSchema}
                Return the analysis as an JSON object, without any other text and without the backticks.
                Do not include any other texts or comments.`;

	return prompt;
};
