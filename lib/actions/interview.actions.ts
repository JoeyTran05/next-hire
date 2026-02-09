import { convertPdfToText } from "../utils";
import { generateQuestionsFromText } from "./ai.actions";
import { getResumeById } from "./resume.actions";

// Generate interview questions
export const generateInterviewSet = async (
	resumeID: string,
	type: string,
	amount: number,
	difficulty: string,
): Promise<InterviewSet | null> => {
	const resumeData = await getResumeById(resumeID);

	if (!resumeData) return null;

	// Turn pdf to raw text
	const resumeText = await convertPdfToText(resumeData.resume);

	// Generate interview questions
	const interviewQuestions = await generateQuestionsFromText(
		type,
		resumeData.job_title,
		resumeData.job_description,
		amount,
		difficulty,
		resumeText,
	);

	return {
		jobTitle: resumeData.job_title,
		companyName: resumeData.company_name,
		interviewQuestions: interviewQuestions,
	} as InterviewSet;
};
