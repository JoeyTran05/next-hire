import { Button } from "@/components/ui/button";
import { generateAnalysis } from "@/lib/actions/ai.actions";
import { MessagesSquare, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

const card = [
	{ label: "Questions", value: 5 },
	{ label: "Duration", value: "~15 min" },
	{ label: "Difficulty", value: "Medium" },
];

generateAnalysis(
	"Software Engineer",
	"Develop and maintain web applications using modern frameworks.",
	"Tech Corp",
	"Experienced Software Engineer with a strong background in developing scalable web applications. Proficient in JavaScript, React, and Node.js. Skilled in collaborating with cross-functional teams to deliver high-quality software solutions. Adept at problem-solving and optimizing application performance.")

const Practice = () => {
	return (
		<main className="relative overflow-hidden flex items-center justify-center min-h-screen pt-12">
			<div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mb-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold">
						AI Interview Practice
					</h1>
					<p className="mt-4 text-lg text-gray-600">
						Practice with our AI agent and get real-time feedback
					</p>
				</div>
				<div className="flex flex-col p-15 justify-between items-center text-center gap-4 w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
					<MessagesSquare className="w-25 h-25" />
					<h1>Welcome to Interview Practice</h1>
					<p>
						Our AI interviewer will ask you common interview
						questions. Take your time to answer, and you&apos;ll
						receive feedback on your responses, including pace,
						clarity, and confidence.
					</p>
					<div className="flex justify-between gap-4 border-t border-gray-300 py-5 w-full">
						{card.map((item, index) => (
							<div
								key={index}
								className="w-full bg-linear-to-br from-cyan-50 to-sky-50 rounded-lg p-4 border border-cyan-200"
							>
								<h2 className="text-2xl font-bold text-teal-600">
									{item.value}
								</h2>
								<p className="text-sm text-gray-600">
									{item.label}
								</p>
							</div>
						))}
					</div>
					<Link href="/practice/interview">
						<div className="flex gap-2 bg-teal-600 hover:bg-teal-700 text-white justify-between items-center p-4 rounded-lg">
							<Play className="w-6 h-6" />
							<p className="text-xl font-medium">
								Start Interview
							</p>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Practice;
