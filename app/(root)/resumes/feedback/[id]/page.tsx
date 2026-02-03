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

const ResumeFeedback = async ({ params }: RouteParams) => {
    const { id } = await params;
    const user = await currentUser();

    if (!user) return <RedirectToSignIn />;

    return (
        <div className="mt-12 w-6/7 mx-auto px-6">
            <div className="grid grid-cols-5 gap-30 items-start">
                <div className="col-span-2 sticky top-8">
                    <div className="p-3 rounded-xl overflow-hidden bg-[#d1e3f6] shadow-[0_20px_40px_rgba(15,23,42,0.10)] w-[550px]">
                        <Image
                            src="/resume-template1.jpg"
                            alt="Resume Preview"
                            width={550}
                            height={900}
                            className="w-full h-auto rounded-xl"
                        />
                    </div>
                </div>

                <div className="col-span-3 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">
                        Resume review
                    </h1>

                    <div className="bg-[#F1F5FB] px-8 py-6 rounded-2xl border-[#CDD7E6] shadow-[0_4px_12px_rgba(0,0,0,0.11)] border">
                        <div className="flex items-center gap-6 mb-6">
                            <ScoreGauge score={100} />

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
                            <ResumeCategoryScore title="ATS Score" score={85} />
                            <ResumeCategoryScore
                                title="Keyword Match"
                                score={65}
                            />
                            <ResumeCategoryScore title="Impact" score={45} />
                            <ResumeCategoryScore
                                title="Readability"
                                score={45}
                            />
                            <ResumeCategoryScore title="Relevance" score={45} />
                            <ResumeCategoryScore
                                title="Consistency"
                                score={45}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <ResumeSectionAnalysis
                            title="Work Experience"
                            score={85}
                            icon={FileText}
                            comment="Your work experience section is well-structured with clear job titles and quantifiable achievements. Consider adding more metrics to demonstrate impact.Your work experience section is well-structured with clear job titles and quantifiable achievements. Consider adding more metrics to demonstrate impact.Your work experience section is well-structured with clear job titles and quantifiable achievements. Consider adding more metrics to demonstrate impact."
                        />
                        <ResumeSectionAnalysis
                            title="Skills Alignment"
                            score={65}
                            icon={Target}
                            comment="Good match with job requirements, but some key technical skills are missing. Consider highlighting cloud computing and DevOps experience."
                        />
                        <ResumeSectionAnalysis
                            title="Action Verbs"
                            score={45}
                            icon={Zap}
                            comment="Limited use of strong action verbs. Replace passive language with dynamic verbs like 'spearheaded', 'orchestrated', and 'optimized'."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeFeedback;
