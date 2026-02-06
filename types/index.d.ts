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
