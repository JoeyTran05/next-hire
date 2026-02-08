"use client";

import SelectInterviewResume from "@/components/SelectInterviewResume";
import StartInterviewForm from "@/components/StartInterviewForm";
import React, { useState } from "react";

const Practice = () => {
	const [resumeChosen, setResumeChosen] = useState<Resume | null>(null);

	if (!resumeChosen)
		return (
			<SelectInterviewResume
				onSelect={(resume: Resume) => setResumeChosen(resume)}
			/>
		);

	return (
		<main className="relative overflow-hidden flex items-center justify-center pt-12">
			<div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mb-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold">
						AI Interview Practice
					</h1>
					{/* <p className="mt-4 text-lg text-gray-600">
						Practice with our AI agent and get real-time feedback
					</p> */}
				</div>
				<StartInterviewForm
					resumeChosen={resumeChosen}
					setResumeChosen={setResumeChosen}
				/>
			</div>
		</main>
	);
};

export default Practice;
