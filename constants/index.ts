import { z } from "zod";

export const voices = {
	male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
	female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

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

export const interviewFormSchema = z.object({
	type: z.string().min(1, "Interview type is required."),
	role: z
		.string()
		.min(2, "Role must be at least 2 characters.")
		.max(50, "Role must be at most 50 characters."),
	level: z.string().min(1, "Experience level is required."),
	techstack: z
		.string()
		.min(2, "Tech stack must be at least 2 characters.")
		.max(200, "Tech stack must be at most 200 characters."),
	amount: z
		.number()
		.min(1, "Amount must be at least 1.")
		.max(20, "Amount must be at most 20."),
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

export const getResumeFeedbackPrompt = (
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

export const interviewQuestionSchema = z.object({
	questions_part1: z.array(z.string()),
	questions_part2: z.array(z.string()),
	questions_part3: z.array(z.string()),
});

export const getInterviewQuestionPrompt = (
	type: string,
	title: string,
	description: string,
	amount: number,
	difficulty: string,
	resumeText: string,
) => {
	const prompt = `Prepare questions for a job interview,
                The job title is ${title}.
                The job description is ${description}. 
                The focus between behavioral and technical questions should lean towards ${type}.
				The interview questions should be relevant to the following resume. 
				Resume text:
				${resumeText}

				The difficulty level of the interview questions should be ${difficulty}.
                Questions should be created for each of the following sections: 
                Part 1: Background & Experience
                - General questions about the candidate background, education, and previous work experience.

                Part 2: Role-Specific & Skill-Based Questions
                - Questions related to the job role, technical skills, or responsibilities.

                Part 3: Behavioral & Situational Questions
                - Behavioral or scenario-based questions to understand how the candidate handles real-world situations

				Generate a total of ${amount} questions, you can decide how many questions to generate for each section.
                Please return only the questions, without any additional text or explanation.
				The questions are going to be read by a voice assistant, so don't use "/" or "*" or any other special characters which might break the voice assistant`;
	return prompt;
};

export const interviewFeedbackSchema = z.object({
	overall_score: z.number(),
	strengths: z.string(),
	areas_for_improvement: z.string(),
	category_feedback: z
		.array(
			z.object({
				name: z.enum([
					"Communication Clarity",
					"Professional Language",
					"Relevance of Answers",
					"Problem Solving",
					"Experience Alignment",
					"Confidence Presence",
					"Technical Role Knowledge",
				]),
				score: z.number(),
				comment: z.string(),
			}),
		)
		.length(7),
});

export const getInterviewFeedbackPrompt = (transcript: string) => {
	const prompt = `You are a professional interview evaluator providing structured, objective feedback on a candidate interview performance.

                Below is the full interview transcript. The transcript contains alternating lines of interviewer questions and candidate answers, each labeled by role and separated by a colon (:).

                INTERVIEW TRANSCRIPT:
                ${transcript}

                TASK:
                You must analyze the candidate responses in relation to the questions asked and provide a structured evaluation with a numerical score (0–100) and concise justification for each category.

                MARKING CATEGORIES:

				1. Overall Score  
                - Holistic assessment based on all categories  
                - Overall suitability for the role
				
				2. Strengths
                - Key strengths

				3. Areas for improvement
				- Key areas for improvement

                4. Communication Clarity  
                - Clarity of explanations  
                - Logical structure of responses  
                - Whether the candidate avoids rambling or confusion  

                5. Professional Language & Vocabulary  
                - Use of appropriate workplace terminology  
                - Level of professionalism in word choice  
                - Avoidance of slang or overly casual language  

                6. Relevance of Answers  
                - How directly responses address the questions asked  
                - Whether the candidate stays on topic  
                - Degree of specificity vs. generic answers  

                7. Problem-Solving & Critical Thinking  
                - Ability to reason through questions  
                - Evidence of analytical thinking  
                - Use of structured explanations when discussing challenges  

                8. Experience Alignment  
                - How well the candidate background aligns with the role  
                - Quality and relevance of real examples provided  

                9. Confidence & Presence  
                - Perceived confidence in responses  
                - Ability to handle challenging or unexpected questions  

                10. Technical / Role-Specific Knowledge  
                - Depth of knowledge related to the role  
                - Accuracy of explanations and concepts`;

	return prompt;
};
