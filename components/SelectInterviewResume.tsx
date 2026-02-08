"use client";

import { getResumesByUser } from "@/lib/actions/resume.actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface SelectInterviewResumeProps {
	onSelect: (resume: Resume) => void;
}

const SelectInterviewResume = ({ onSelect }: SelectInterviewResumeProps) => {
	const [resumes, setResumes] = useState([] as Resume[]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUser();

	useEffect(() => {
		const fetchResumes = async () => {
			if (!user?.id) return;

			setIsLoading(true);

			const response = await getResumesByUser(user?.id || "");
			setResumes(response || []);
			setIsLoading(false);
		};

		fetchResumes();
	}, [user]);

	if (isLoading)
		return (
			<div className="p-10">
				<h2 className="text-2xl font-semibold mb-4">
					Select a Resume for Interview Practice
				</h2>
				<div className="flex flex-wrap gap-6">
					<div className="p-5 bg-gray-400 border rounded-lg hover:shadow-lg cursor-pointer">
						<Skeleton className="h-6 w-40 mb-2" />
						<Skeleton className="h-4 w-60 mb-4" />
						<Skeleton className="h-40 w-72" />
					</div>
					<div className="p-5 bg-gray-400 border rounded-lg hover:shadow-lg cursor-pointer">
						<Skeleton className="h-6 w-40 mb-2" />
						<Skeleton className="h-4 w-60 mb-4" />
						<Skeleton className="h-40 w-72" />
					</div>
					<div className="p-5 bg-gray-400 border rounded-lg hover:shadow-lg cursor-pointer">
						<Skeleton className="h-6 w-40 mb-2" />
						<Skeleton className="h-4 w-60 mb-4" />
						<Skeleton className="h-40 w-72" />
					</div>
					<div className="p-5 bg-gray-400 border rounded-lg hover:shadow-lg cursor-pointer">
						<Skeleton className="h-6 w-40 mb-2" />
						<Skeleton className="h-4 w-60 mb-4" />
						<Skeleton className="h-40 w-72" />
					</div>
				</div>
			</div>
		);

	return (
		<div className="p-10">
			<h2 className="text-2xl font-semibold mb-4">
				Select a Resume for Interview Practice
			</h2>
			<div className="flex flex-wrap gap-6">
				{resumes.length > 0 ? (
					resumes.map((resume) => (
						<div
							key={resume.id}
							className="p-5 border rounded-lg hover:shadow-lg cursor-pointer"
							onClick={() => onSelect(resume)}
						>
							<h3 className="text-lg font-bold">
								{resume.job_title}
							</h3>
							<p className="text-gray-600 pb-2">
								Uploaded on:{" "}
								{new Date(
									resume.created_at,
								).toLocaleDateString()}
							</p>
							<Image
								src="/resume-template1.jpg"
								width={300}
								height={200}
								alt="Resume Template"
							/>
						</div>
					))
				) : (
					<p>
						No resumes found. Please upload a resume to get started.
					</p>
				)}
			</div>
		</div>
	);
};

export default SelectInterviewResume;
