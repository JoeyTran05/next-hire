import { LucideIcon } from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

interface ResumeSectionAnalysisProps {
    title: string;
    score: number;
    comment: string;
    icon: LucideIcon;
}

const ResumeSectionAnalysis = ({
    title,
    score,
    comment,
    icon: Icon,
}: ResumeSectionAnalysisProps) => {
    const getScoreColor = () => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const getProgressColor = () => {
        if (score >= 80) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getIconColor = () => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        // <div className="py-5 px-6 bg-[#F1F5FB] border-[#CDD7E6] shadow-[0_4px_12px_rgba(0,0,0,0.11)] border rounded-lg">
        //     <div className="flex items-center justify-between mb-3">
        //         <div className="flex items-center gap-3">
        //             <Icon className={`w-7 h-7 ${getIconColor()}`} />
        //             <h4 className="text-2xl font-semibold">{title}</h4>
        //         </div>
        //         <div className="flex items-center gap-1">
        //             <span className={`text-xl font-bold ${getScoreColor()}`}>
        //                 {score}
        //             </span>
        //             <span className="text-gray-400 text-xl">/100</span>
        //         </div>
        //     </div>

        //     <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        //         <div
        //             className={`${getProgressColor()} h-2 rounded-full transition-all duration-500`}
        //             style={{ width: `${score}%` }}
        //         ></div>
        //     </div>

        //     <p className="text-gray-500 text-xl leading-relaxed">{comment}</p>
        // </div>
        <Accordion type="single" collapsible>
            <AccordionItem value={title} className="border-none">
                <div className="py-5 px-6 bg-gradient-to-r from-white to-pink-200/60 border-0 shadow-[0_10px_24px_rgba(6,182,212,0.2)] rounded-2xl">
                    {/* HEADER = Accordion Trigger */}
                    <AccordionTrigger className="p-0 hover:no-underline flex items-center justify-between">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <Icon className={`w-7 h-7 ${getIconColor()}`} />
                                <h4 className="text-2xl font-semibold">
                                    {title}
                                </h4>
                            </div> 

                            <div className="flex items-center gap-1">
                                <span
                                    className={`text-xl font-bold ${getScoreColor()}`}
                                >
                                    {score}
                                </span>
                                <span className="text-black text-xl">
                                    / 100
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>

                    {/* CONTENT = what appears when expanded */}
                    <AccordionContent>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    className={`${getProgressColor()} h-2 rounded-full transition-all duration-500`}
                                    style={{ width: `${score}%` }}
                                ></div>
                            </div>

                            <p className="text-gray-500 text-xl leading-relaxed">
                                {comment}
                            </p>
                        </div>
                    </AccordionContent>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default ResumeSectionAnalysis;
