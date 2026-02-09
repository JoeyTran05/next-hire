import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PDFParse } from "pdf-parse";
import { voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function convertPdfToText(publicUrl: string): Promise<string> {
	const parser = new PDFParse({ url: publicUrl });
	const result = await parser.getText();
	await parser.destroy();
	return result.text;
}

export const configureAssistant = (voice: string, style: string) => {
	const voiceId =
		voices[voice as keyof typeof voices][
			style as keyof (typeof voices)[keyof typeof voices]
		] || "sarah";

	const interviewer: CreateAssistantDTO = {
		name: "Interviewer",
		firstMessage:
			"Hello, and welcome to your interview. My name is Next AI, and I'll be your interviewer today. This interview is for the {{job_title}} position at {{company_name}}. When you're ready, please say I'm ready and we'll begin.",
		transcriber: {
			provider: "deepgram",
			model: "nova-3",
			language: "en",
		},
		voice: {
			provider: "11labs",
			voiceId: voiceId,
			stability: 0.4,
			similarityBoost: 0.8,
			speed: 1,
			style: 0.5,
			useSpeakerBoost: true,
		},
		silenceTimeoutSeconds: 80,
		maxDurationSeconds: 900,
		startSpeakingPlan: {
			waitSeconds: 2,
			smartEndpointingPlan: { provider: "livekit" },
		},
		endCallPhrases: [
			"This concludes the interview. Thank you for taking the time to speak with us today.",
			"You will receive feedback on your interview shortly.",
		],
		model: {
			provider: "openai",
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: `You are a professional job interviewer conducting a real-time voice interview with a candidate on an online hiring platform. Your goal is to assess the candidate's communication skills, relevant experience, problem-solving ability, and overall suitability for the role.

					Interview Guidelines:
					Follow a structured interview flow:

					Interview Structure:
					Introduction:
					- Briefly introduce yourself.

					Part 1: Background & Experience
					- Ask general questions about the candidate's background, education, and previous work experience.
					- Questions to ask: {{questions_part1}}

					Part 2: Role-Specific & Skill-Based Questions
					- Ask questions related to the job role, technical skills, or responsibilities.
					- Questions to ask: {{questions_part2}}

					Part 3: Behavioral & Situational Questions
					- Ask behavioral or scenario-based questions to understand how the candidate handles real-world situations.
					- Questions to ask: {{questions_part3}}

					Engage naturally & react appropriately:
					- Listen actively to the candidate's responses.
					- Acknowledge answers briefly before moving to the next question.
					- Ask one question at a time.
					- Maintain control of the interview flow while keeping the conversation natural.

					Tone & Communication Style:
					- Be professional, confident, and respectful.
					- Use clear, concise, and natural spoken language.
					- Sound like a real human interviewer, not robotic.
					- Keep responses short, as this is a voice conversation.
					- Do not ramble or over-explain.

					Important Rules:
					- Do NOT give hints, coaching, or feedback during the interview.
					- Do NOT tell the candidate how to answer.
					- Do NOT mention question numbers.
					- Focus only on asking questions and listening.

					Conclusion:
					End the interview by saying the following phrases exactly every time:
					- This concludes the interview. Thank you for taking the time to speak with us today.
					- You will receive feedback on your interview shortly.

					End the conversation on a polite, professional, and positive note.`,
				},
			],
		},
		// @ts-expect-error typecript error
		clientMessages: [],
		// @ts-expect-error typecript error
		serverMessages: [],
	};
	return interviewer;
};
