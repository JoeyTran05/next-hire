import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ScoreGauge from "@/components/ScoreGauge";
import ResumeCategoryScore from "@/components/ResumeCategoryScore";
import ResumeSectionAnalysis from "@/components/ResumeSectionAnalysis";
import { Briefcase, Zap, BookOpen, Boxes } from "lucide-react";
import {
	getResumeFeedbackByID,
	getResumePDF,
} from "@/lib/actions/feedback.actions";

const ResumeFeedback = async ({ params }: RouteParams) => {
	const { id } = await params;
	const user = await currentUser();

	if (!user) return <RedirectToSignIn />;

	// Get resume feedback data using ResumeID
	const feedbackData = await getResumeFeedbackByID(id);
	const sectionsFeedback = feedbackData?.section_feedback;

	// Get resume PDF URL using ResumeID
	const resumePDF = await getResumePDF(id);

	if (!feedbackData) return <div>No feedback data found.</div>;

	return (
		<div className="mt-12 w-6/7 mx-auto px-6 mb-10 ">
			<div className="grid grid-cols-5 gap-30 items-start">
				<div className="col-span-2 sticky top-8">
					<div className="p-3 rounded-xl overflow-hidden bg-[#d1e3f6] shadow-[0_20px_40px_rgba(15,23,42,0.10)] h-172">
						<iframe
							src={resumePDF?.resume + "#toolbar=0"}
							className="w-full h-full bg-white"
						/>
					</div>
				</div>

				<div className="col-span-3 flex flex-col gap-6">
					<h1 className="text-4xl font-bold text-blue-500">
						Resume review
					</h1>

					<div className="bg-white/80 backdrop-blur-md px-8 py-6 rounded-3xl border-[#E0E7FF] shadow-[0_8px_24px_rgba(79,70,229,0.12)] border">
						<div className="flex items-center gap-6 mb-6">
							<ScoreGauge score={feedbackData.overall_score} />

							<div className="flex flex-col">
								<h3 className="text-3xl font-semibold">
									Overall assesment
								</h3>
								<p className="text-gray-500 font-semibold">
									This score is calculated based on the
									following criteria
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<ResumeCategoryScore
								title="ATS Score"
								score={feedbackData.ats_score}
							/>
							<ResumeCategoryScore
								title="Keyword Match"
								score={feedbackData.keyword_match_score}
							/>
							<ResumeCategoryScore
								title="Impact"
								score={feedbackData.impact_score}
							/>
							<ResumeCategoryScore
								title="Readability"
								score={feedbackData.readability_score}
							/>
							<ResumeCategoryScore
								title="Relevance"
								score={feedbackData.relevance_score}
							/>
							<ResumeCategoryScore
								title="Consistency"
								score={feedbackData.consistency_score}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-7">
						{sectionsFeedback?.map((section) => (
							<ResumeSectionAnalysis
								key={section.name}
								title={section.name}
								score={section.score}
								icon={
									section.name === "Experience"
										? Briefcase
										: section.name === "Education"
											? BookOpen
											: section.name === "Skills"
												? Zap
												: Boxes
								}
								comment={section.comment}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResumeFeedback;
