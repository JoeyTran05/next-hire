import InterviewVapiModel from "@/components/InterviewVapiModel";
import { generateInterviewSet } from "@/lib/actions/interview.actions";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const InterviewSession = async ({
	params,
	searchParams,
}: InterviewSessionProps) => {
	const user = await currentUser();
	const { id } = await params;
	// fetch amount of questions and difficulty
	const { q, d } = await searchParams;

	if (!user) return <RedirectToSignIn />;

	console.log(id, q, d);

	const interviewSet = await generateInterviewSet(id, "behavioral", q, d);
	const { jobTitle, companyName, interviewQuestions } = interviewSet!;
	console.log("Interview Questions in Session Page:", interviewQuestions);

	return (
		<main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
			<article className="flex rounded-4xl border border-black justify-between p-6 max-md:flex-col">
				<div className="flex items-center gap-2">
					<div className="size-18 flex items-center justify-center rounded-lg max-md:hidden bg-white">
						<Image
							src={`/logo.png`}
							alt="logo"
							width={35}
							height={35}
						/>
					</div>

					<div className="flex flex-col gap-2 ml-2">
						<div className="flex items-center gap-2">
							<p className="font-bold text-2xl">
								Interview Session
							</p>
						</div>
						<p className="text-lg">
							{companyName} - {jobTitle}
						</p>
					</div>
				</div>
				<div className="items-start text-2xl max-md:hidden">
					{`${q * 3} minutes`}
				</div>
			</article>

			<InterviewVapiModel
				userId={user.id}
				userName={user.fullName!}
				userImage={user.imageUrl}
				questions={interviewQuestions}
				jobTitle={jobTitle}
				companyName={companyName}
			/>
		</main>
	);
};

export default InterviewSession;
