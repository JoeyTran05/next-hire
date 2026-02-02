" use server "

import { resumeFeedbackPrompt, resumeFeedbackSchema } from "@/constants/index"
import { google } from '@ai-sdk/google'
import { generateText, Output } from "ai"



export const generateAnalysis = async (jobTitle: string, jobDescription: string, companyName: string, resumeText: string) => {
    try {
        const { output } = await generateText({

            model: google('gemini-3-flash-preview'),

            output: Output.object({ schema: resumeFeedbackSchema }),

            prompt: resumeFeedbackPrompt(jobTitle, jobDescription, companyName, resumeText),

        

        })
        console.log("Generated analysis:", output);
        return output;
    }
    catch (error) {
        console.error("Error generating analysis:", error);
        throw error;
    }
}