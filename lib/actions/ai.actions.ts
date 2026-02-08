"use server";

import { interviewQuestionPrompt, interviewQuestionSchema, resumeFeedbackPrompt, resumeFeedbackSchema } from "@/constants/index";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";

export const generateAnalysis = async (
	jobTitle: string,
	jobDescription: string,
	companyName: string,
	resumeText: string,
) => {
	try {
		const { output } = await generateText({
			model: google("gemini-3-flash-preview"),

			output: Output.object({ schema: resumeFeedbackSchema }),

			prompt: resumeFeedbackPrompt(
				jobTitle,
				jobDescription,
				companyName,
				resumeText,
			),
		});
		console.log("Generated analysis:", output);
		return output;
	} catch (error) {
		console.error("Error generating analysis:", error);
		throw error;
	}
};


export const generateInterviewQuestions = async (
	type: string,
	description: string,
	title: string,
	difficulty: string,
	amount: number,
	resumeText: string,
) => {
	try {
		const { output } = await generateText({
			model: google("gemini-3-flash-preview"),

			output: Output.object({ schema: interviewQuestionSchema }),

			prompt: interviewQuestionPrompt(
				type,
				description,
				title,
				difficulty,
				amount,
				resumeText,
			),
		});
		return output;
	} catch (error) {
		console.error("Error generating interview questions:", error);
		throw error;
	}
};
