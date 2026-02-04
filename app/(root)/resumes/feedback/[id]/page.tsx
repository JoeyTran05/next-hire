import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ScoreGauge from "@/components/ScoreGauge";
import ResumeCategoryScore from "@/components/ResumeCategoryScore";
import ResumeSectionAnalysis from "@/components/ResumeSectionAnalysis";
import {
    FileText,
    Target,
    Zap,
    BookOpen,
    Link2,
    CheckCircle,
} from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
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

    if (feedbackData) {
        return (
            <div className="mt-12 w-6/7 mx-auto px-6">
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
                        <h1 className="text-3xl font-bold">Resume review</h1>

                        <div className="bg-[#F1F5FB] px-8 py-6 rounded-2xl border-[#CDD7E6] shadow-[0_4px_12px_rgba(0,0,0,0.11)] border">
                            <div className="flex items-center gap-6 mb-6">
                                <ScoreGauge
                                    score={feedbackData.overall_score}
                                />

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

                        <div className="flex flex-col gap-4">
                            <ResumeSectionAnalysis
                                title={sectionsFeedback[0].name}
                                score={sectionsFeedback[0].score}
                                icon={FileText}
                                comment={sectionsFeedback[0].comment}
                            />
                            <ResumeSectionAnalysis
                                title={sectionsFeedback[1].name}
                                score={sectionsFeedback[1].score}
                                icon={Target}
                                comment={sectionsFeedback[1].comment}
                            />
                            <ResumeSectionAnalysis
                                title={sectionsFeedback[2].name}
                                score={sectionsFeedback[2].score}
                                icon={Zap}
                                comment={sectionsFeedback[2].comment}
                            />
                            <ResumeSectionAnalysis
                                title={sectionsFeedback[3].name}
                                score={sectionsFeedback[3].score}
                                icon={Zap}
                                comment={sectionsFeedback[3].comment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <div>No feedback data found.</div>;
};

export default ResumeFeedback;
