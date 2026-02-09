"use server";

import {
    getInterviewQuestionPrompt,
    getResumeFeedbackPrompt,
    interviewFeedbackPrompt,
    interviewFeedbackSchema,
    interviewQuestionSchema,
    resumeFeedbackSchema,
} from "@/constants/index";
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

            prompt: getResumeFeedbackPrompt(
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

export const generateQuestionsFromText = async (
    type: string,
    title: string,
    description: string,
    amount: number,
    difficulty: string,
    resumeText: string,
) => {
    try {
        const { output } = await generateText({
            model: google("gemini-3-flash-preview"),

            output: Output.object({ schema: interviewQuestionSchema }),

            prompt: getInterviewQuestionPrompt(
                type,
                title,
                description,
                amount,
                difficulty,
                resumeText,
            ),
        });
        return output;
    } catch (error) {
        console.error("Error generating interview questions:", error);
        throw error;
    }
};

export const generateInterviewFeedback = async (transcript: string) => {
    try {
        const { output } = await generateText({
            model: google("gemini-3-flash-preview"),

            output: Output.object({ schema: interviewFeedbackSchema }),

            prompt: interviewFeedbackPrompt(transcript),
        });
        return output;
    } catch (error) {
        console.error("Error generating interview feedback:", error);
        throw error;
    }
};
