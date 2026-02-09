interface CreateResume {
	jobTitle: string;
	companyName: string;
	jobDescription: string;
	resume: File;
}

interface Resume {
	id: string;
	user_id: string;
	job_title: string;
	company_name: string;
	job_description: string;
	resume: string;
	created_at: string;
}

interface ResumeFeedbackParams {
	overall_score: number;
	ats_score: number;
	keyword_match_score: number;
	impact_score: number;
	readability_score: number;
	relevance_score: number;
	consistency_score: number;
	summary_feedback: string;
	section_feedback: {
		name: "Experience" | "Education" | "Skills" | "Projects";
		score: number;
		comment: string;
	}[];
	resume_id: string;
}

interface RouteParams {
	params: Promise<Record<string, string>>;
	searchParams: Promise<Record<string, string>>;
}

interface InterviewSessionParams {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ q: number; d: string }>;
}

interface InterviewSet {
	jobTitle: string;
	companyName: string;
	interviewQuestions: {
		questions_part1: string[];
		questions_part2: string[];
		questions_part3: string[];
	};
}

interface InterviewVapiModelProps {
	userId: string;
	userName: string;
	userImage: string;
	questions: {
		questions_part1: string[];
		questions_part2: string[];
		questions_part3: string[];
	};
	jobTitle: string;
	companyName: string;
	resumeId: string;
}

interface SavedMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

interface InterviewFeedbackSchema {
	overall_score: number;
	strengths: string;
	areas_for_improvement: string;
	category_feedback: {
		name:
			| "Communication Clarity"
			| "Professional Language"
			| "Relevance of Answers"
			| "Problem Solving"
			| "Experience Alignment"
			| "Confidence Presence"
			| "Technical Role Knowledge";
		score: number;
		comment: string;
	}[];
}

interface InsertInterviewFeedbackParams {
	userId: string;
	resumeId: string;
	transcript: { role: string; content: string }[];
}
