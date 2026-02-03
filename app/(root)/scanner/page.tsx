"use client";

import { useState } from "react";
import * as z from "zod";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { analyzeResume } from "@/lib/actions/resume.actions";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import ResumeForm from "@/components/ResumeForm";
import { toast } from "sonner";
import { resumeFormSchema } from "@/constants";
import { fireConfetti } from "@/lib/confetti";

const Scanner = () => {
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const router = useRouter();

	const onSubmit = async (data: z.infer<typeof resumeFormSchema>) => {
		toast("Resume submitted successfully!");
		setIsAnalyzing(true);

		const resumeFeedbackId = await analyzeResume(data);

		if (resumeFeedbackId) {
			fireConfetti();
			router.push(`/resumes/feedback/${resumeFeedbackId}`);
			console.log("Resume analyzed:", resumeFeedbackId);
		} else {
			console.log("Failed to analyze resume");
			router.push("/");
		}
	};

	const { user } = useUser();
	if (!user) return <RedirectToSignIn />;

	return (
		<main className="relative overflow-hidden flex items-center justify-center min-h-screen pt-12">
			{isAnalyzing ? (
				<div className="flex flex-col items-center justify-center gap-4">
					<motion.div
						className="w-20 h-20 bg-linear-to-br from-teal-500 via-cyan-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1, repeat: Infinity }}
					>
						<Upload className="w-10 h-10 text-white" />
					</motion.div>
					<motion.h3
						className="text-xl font-bold text-gray-900"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>
						Analyzing Your Resume...
					</motion.h3>
					<motion.p
						className="text-gray-600"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							delay: 0.5,
						}}
					>
						Our AI is processing your submission. Please wait.
					</motion.p>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mb-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold">
							AI Resume Scanner
						</h1>
						<p className="mt-4 text-lg text-gray-600">
							Upload your resume and let our AI analyze it for
							improvements
						</p>
					</div>
					<ResumeForm onSubmit={onSubmit} />
				</div>
			)}
		</main>
	);
};

export default Scanner;
