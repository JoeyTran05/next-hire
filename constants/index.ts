import { z } from "zod";

export const resumeFeedbackSchema = z.object({
	overall_score: z.number(),
	ats_score: z.number(),
	keyword_match_score: z.number(),
	impact_score: z.number(),
	readability_score: z.number(),
	relevance_score: z.number(),
	consistency_score: z.number(),
	summary_feedback: z.string(),
	section_feedback: z.tuple([
		z.object({
			name: z.literal("Experience"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Education"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Skills"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Projects"),
			score: z.number(),
			comment: z.string(),
		}),
	]),
});
