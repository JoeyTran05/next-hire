"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { getResumesByUser } from "@/lib/actions/resume.actions";

const Dashboard = () => {
	const [resumes, setResumes] = useState([] as Resume[]);
	const { user } = useUser();

	useEffect(() => {
		const fetchResumes = async () => {
			if (!user?.id) return;

			const response = await getResumesByUser(user?.id || "");
			setResumes(response || []);
		};

		fetchResumes();
	}, [user]);

	if (!user) return <RedirectToSignIn />;

	return (
		<div>
			<h1 className="text-4xl font-bold text-center mt-12">Dashboard</h1>
			<p className="mt-4 text-lg text-gray-600 text-center">
				Welcome to your dashboard! Here you can manage your account and
				settings.
			</p>

			<div className="px-10 mt-10">
				<h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
				<div className="grid grid-cols-2 gap-5">
					{resumes.length > 0 ? (
						resumes.map((resume) => (
							<Card key={resume.id} className="p-5">
								<CardTitle>{resume.job_title}</CardTitle>
								<CardContent>
									<p>
										Uploaded on:{" "}
										{new Date(
											resume.created_at,
										).toLocaleDateString()}
									</p>
									<div className="mt-4 flex justify-between">
										<Link
											href={`/resumes/${resume.id}`}
											className="text-blue-500 hover:underline"
										>
											View Resume
										</Link>
										<Link
											href={`/resumes/feedback/${resume.id}`}
											className="text-blue-500 hover:underline"
										>
											View Feedback
										</Link>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<p className="text-gray-500">
							No resumes uploaded yet.
						</p>
					)}
				</div>

				<h2 className="text-2xl font-semibold mt-10 mb-4">
					Other Features
				</h2>
				<div className="grid grid-cols-3 gap-5">
					<Card className="p-5">
						<CardTitle>Avg Resume Score</CardTitle>
						<CardContent>50/50</CardContent>
					</Card>

					<Card className="p-5">
						<CardTitle>Avg Interview Score</CardTitle>
						<CardContent>50/50</CardContent>
					</Card>

					<Card className="p-5">
						<CardTitle>Resume Versions</CardTitle>
						<CardContent>5 versions</CardContent>
					</Card>

					<Card className="p-5">
						<CardTitle>Interview Practice Sessions</CardTitle>
						<CardContent>5 sessions</CardContent>
					</Card>

					<Card className="p-5">
						<CardTitle>Upcoming Interviews</CardTitle>
						<CardContent>2 scheduled</CardContent>
					</Card>

					<Card className="p-5">
						<CardTitle>Profile Completion</CardTitle>
						<CardContent>80%</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
