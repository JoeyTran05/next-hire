import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, MessagesSquare, Play } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AIBadge from "./AIBadge";
import MicTest from "./MicTest";
import { useRouter } from "next/navigation";

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

	const [isStarting, setIsStarting] = useState<boolean>(false);

	const router = useRouter();

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

	const startInterview = () => {
		setIsStarting(true);

		router.push(
			`/practice/interview/${resumeChosen.id}?q=${questions}&d=${difficulty}`,
		);
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
			<div className="absolute top-4 right-4 flex gap-2">
				<MicTest />
				<Button
					className=" text-xs px-4 py-2 bg-gray-300 text-gray-900 
							hover:bg-gray-400 hover:cursor-pointer rounded-full font-semibold uppercase"
					onClick={() => setResumeChosen(null)}
				>
					Select Resume Again
				</Button>
			</div>
			<MessagesSquare className="w-25 h-25" />
			<div className="flex items-center">
				<h1 className="mr-2 pb-1">Welcome to Interview Practice</h1>
				<AIBadge />
			</div>
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
							{[2, 3, 4, 5, 6].map((num) => (
								<SelectItem key={num} value={num.toString()}>
									{num}
								</SelectItem>
							))}
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
			<Button
				className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-7"
				onClick={startInterview}
				disabled={isStarting}
			>
				{isStarting ? (
					<div className="flex items-center gap-2 justify-between rounded-lg">
						<Loader2 className="animate-spin w-6 h-6" />
						<p className="text-xl font-medium">Starting...</p>
					</div>
				) : (
					<div className="flex gap-2 justify-between items-center rounded-lg">
						<Play className="w-6 h-6" />
						<p className="text-xl font-medium">Start Interview</p>
					</div>
				)}
			</Button>
		</div>
	);
};

export default StartInterviewForm;
