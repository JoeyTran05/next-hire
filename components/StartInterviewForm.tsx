import { useState } from "react";
import { Button } from "./ui/button";
import { MessagesSquare, Play } from "lucide-react";
import Link from "next/link";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface StartInterviewFormProps {
	resumeChosen: Resume;
	setResumeChosen: (resume: Resume | null) => void;
}

const StartInterviewForm = ({
	resumeChosen,
	setResumeChosen,
}: StartInterviewFormProps) => {
	const [questions, setQuestions] = useState<number>(5);
	const [difficulty, setDifficulty] = useState<string>("Medium");

	const calculateDuration = (numQuestions: number): string => {
		// Assuming each question takes 3 minutes
		return `~${numQuestions * 3} min`;
	};

	const handleQuestionsChange = (value: string) => {
		const numQuestions = parseInt(value, 10);
		setQuestions(numQuestions);
	};

	const handleDifficultyChange = (value: string) => {
		setDifficulty(value);
	};

	const card = [
		{ label: "Questions", value: questions },
		{ label: "Duration", value: calculateDuration(questions) },
		{ label: "Difficulty", value: difficulty },
	];

	return (
		<div
			className="relative flex flex-col p-15 justify-between items-center text-center 
						gap-4 w-full border border-gray-300 bg-white rounded-lg overflow-hidden"
		>
			<Button
				className="absolute top-4 right-4 text-xs px-4 py-2 bg-gray-300 text-gray-900 
							hover:bg-gray-400 hover:cursor-pointer rounded-full font-semibold uppercase"
				onClick={() => setResumeChosen(null)}
			>
				Select Resume Again
			</Button>
			<MessagesSquare className="w-25 h-25" />
			<h1>Welcome to Interview Practice</h1>
			<p>
				Our AI interviewer will ask you common interview questions. Take
				your time to answer, and you&apos;ll receive feedback on your
				responses, including pace, clarity, and confidence.
			</p>
			<h2 className="mt-4 text-2xl font-semibold">
				Practice with resume for {resumeChosen.job_title} at{" "}
				{resumeChosen.company_name}
			</h2>
			<div className="flex justify-between gap-4 border-t border-gray-300 pt-5 w-full">
				{card.map((item, index) => (
					<div
						key={index}
						className="w-full bg-linear-to-br from-cyan-50 to-sky-50 rounded-lg p-4 border border-cyan-200"
					>
						<h2 className="text-2xl font-bold text-teal-600">
							{item.value}
						</h2>
						<p className="text-sm text-gray-600">{item.label}</p>
					</div>
				))}
			</div>
			<div className="flex gap-4 pb-3">
				<div>
					<label className="block text-sm font-medium mb-2">
						Number of Questions
					</label>
					<Select
						defaultValue="5"
						onValueChange={handleQuestionsChange}
					>
						<SelectTrigger className="w-full bg-gray-200">
							<SelectValue placeholder="Select number of questions" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="3">3</SelectItem>
							<SelectItem value="4">4</SelectItem>
							<SelectItem value="5">5</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">
						Difficulty
					</label>
					<Select
						defaultValue="Medium"
						onValueChange={handleDifficultyChange}
					>
						<SelectTrigger className="w-full bg-gray-200">
							<SelectValue placeholder="Select difficulty" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Easy">Easy</SelectItem>
							<SelectItem value="Medium">Medium</SelectItem>
							<SelectItem value="Hard">Hard</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Link
				href={`/practice/interview/${resumeChosen.id}?q=${questions}&d=${difficulty}`}
			>
				<div className="flex gap-2 bg-teal-600 hover:bg-teal-700 text-white justify-between items-center p-4 rounded-lg">
					<Play className="w-6 h-6" />
					<p className="text-xl font-medium">Start Interview</p>
				</div>
			</Link>
		</div>
	);
};

export default StartInterviewForm;
