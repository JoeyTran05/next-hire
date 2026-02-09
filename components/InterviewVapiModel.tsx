"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { vapi } from "@/lib/vapi.sdk";
import { cn, configureAssistant } from "@/lib/utils";
import soundwaves from "@/constants/soundwaves.json";
import loadingSpinner from "@/constants/loading.json";
import { toast } from "sonner";
import { useRouter } from "next/router";

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

const InterviewVapiModel = ({
	userId,
	userName,
	userImage,
	questions,
	jobTitle,
	companyName,
}: InterviewVapiModelProps) => {
	const [callStatus, setCallStatus] = useState<CallStatus>(
		CallStatus.INACTIVE,
	);
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isGeneratingFeedback, setIsGeneratingFeedback] =
		useState<boolean>(false);
	const [messages, setMessages] = useState<SavedMessage[]>([]);
	const [showEndPrompt, setShowEndPrompt] = useState(false);

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	// const router = useRouter();

	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play();
			} else {
				lottieRef.current?.stop();
			}
		}
	}, [isSpeaking, lottieRef]);

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

		const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

		const onMessage = (message: Message) => {
			if (
				message.type === "transcript" &&
				message.transcriptType === "final"
			) {
				const newMessage = {
					role: message.role,
					content: message.transcript,
				};
				setMessages((prev) => [newMessage, ...prev]);
			}
		};

		const onSpeechStart = () => setIsSpeaking(true);
		const onSpeechEnd = () => setIsSpeaking(false);

		const onError = (error: Error) => console.log("Error:", error);

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("error", onError);
		vapi.on("speech-start", onSpeechStart);
		vapi.on("speech-end", onSpeechEnd);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("error", onError);
			vapi.off("speech-start", onSpeechStart);
			vapi.off("speech-end", onSpeechEnd);
		};
	}, []);

	useEffect(() => {
		const role = messages[0]?.role;
		const content = messages[0]?.content.toLowerCase();

		if (
			role === "assistant" &&
			(content.includes("concludes the interview") ||
				content.includes("feedback"))
		) {
			setShowEndPrompt(true);
		}
	}, [messages]);

	const handleGenerateFeedback = async (messsages: SavedMessage[]) => {
		console.log("Generate feedback with messages:", messsages);

		// const { success, feedbackId: id } = await createInterviewFeedback({
		// 	userId: userId,
		// 	resumeId: id,
		// 	transcript: messsages,
		// });

		// if (success && id) {
		// 	router.push(`/practice/interview/${id}/feedback`);
		// } else {
		// 	console.log("Failed to generate feedback");
		// 	router.push("/take-tests/speaking");
		// 	toast("Failed to generate feedback");
		// }
	};

	useEffect(() => {
		if (callStatus === CallStatus.FINISHED) {
			setIsGeneratingFeedback(true);
			handleGenerateFeedback(messages).finally(() => {
				setIsGeneratingFeedback(false);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages, callStatus]);

	const toggleMicrophone = () => {
		const isMuted = vapi.isMuted();
		vapi.setMuted(!isMuted);
		setIsMuted(!isMuted);
	};

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);

		let formattedQuestionsPart1 = "";
		let formattedQuestionsPart2 = "";
		let formattedQuestionsPart3 = "";

		if (questions) {
			formattedQuestionsPart1 = questions.questions_part1
				.map((question) => `- ${question}`)
				.join("\n");
			formattedQuestionsPart2 = questions.questions_part1
				.map((question) => `- ${question}`)
				.join("\n");
			formattedQuestionsPart3 = questions.questions_part1
				.map((question) => `- ${question}`)
				.join("\n");
		}

		const assistantOverrides = {
			variableValues: {
				questions_part1: formattedQuestionsPart1,
				questions_part2: formattedQuestionsPart2,
				questions_part3: formattedQuestionsPart3,
				job_title: jobTitle,
				company_name: companyName,
			},
			clientMessages: ["transcript"],
			serverMessages: [],
		};

		vapi.start(
			configureAssistant("male", "formal"),
			// @ts-expect-error typecript error
			assistantOverrides,
		);
	};

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	};

	return (
		<section className="flex flex-col h-[70vh] mb-20">
			<section className="flex gap-8 max-sm:flex-col">
				<div className="border-2 border-orange-500 w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg max-sm:py-5">
					<div className="relative w-75 h-75 flex items-center justify-center rounded-lg mt-4 max-sm:w-25 max-sm:h-25 bg-pink-300">
						<div
							className={cn(
								"absolute transition-opacity, duration-1000",
								callStatus === CallStatus.FINISHED ||
									callStatus === CallStatus.INACTIVE
									? "opacity-100"
									: "opacity-0",
								callStatus === CallStatus.CONNECTING &&
									"opacity-100 animate-pulse",
							)}
						>
							<Image
								src="/logo.png"
								alt="logo"
								width={150}
								height={150}
								className="object-contain p-4 max-sm:p-1"
							/>
						</div>
						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.ACTIVE
									? "opacity-100"
									: "opacity-0",
							)}
						>
							<Lottie
								lottieRef={lottieRef}
								animationData={soundwaves}
								autoPlay={false}
								className="size-75 max-sm:size-25"
							/>
						</div>
					</div>
					<p className="font-bold text-2xl">AI Interviewer</p>
					{showEndPrompt && (
						<p className="mt-2 text-sm text-yellow-600 animate-pulse font-medium">
							The interview is finished. Please click &quot;End
							Session&quot; to complete.
						</p>
					)}
				</div>

				<div className="flex flex-col gap-4 w-1/3 max-sm:w-full max-sm:flex-row">
					<div className="border-2 border-black flex flex-col gap-4 items-center rounded-lg py-8 max-sm:hidden">
						<Image
							src={userImage}
							alt={userName}
							width={130}
							height={130}
							className="rounded-lg"
						/>
						<p className="font-bold text-2xl">{userName}</p>
					</div>
					<button
						className="border-2 border-black rounded-lg flex flex-col gap-2 items-center py-8 max-sm:py-2 cursor-pointer w-full"
						disabled={callStatus === CallStatus.INACTIVE}
						onClick={toggleMicrophone}
					>
						<Image
							src={
								isMuted
									? "/icons/mic-off.svg"
									: "/icons/mic-on.svg"
							}
							alt="mic"
							width={36}
							height={36}
						/>
					</button>
					<button
						// disabled={!readyState}
						className={cn(
							"rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
							callStatus === CallStatus.ACTIVE
								? "bg-red-700"
								: "bg-primary",
							callStatus === CallStatus.CONNECTING &&
								"animate-pulse",
							callStatus === CallStatus.INACTIVE &&
								// readyState &&
								"glow-pulse",
							// !readyState &&
							// 	"bg-gray-400 cursor-not-allowed opacity-70",
							showEndPrompt && "glow-pulse",
						)}
						onClick={
							callStatus === CallStatus.ACTIVE
								? handleDisconnect
								: handleCall
						}
					>
						{callStatus === CallStatus.ACTIVE
							? "End Session"
							: callStatus === CallStatus.CONNECTING
								? "Connecting"
								: "Start Session"}
					</button>
				</div>
			</section>
			{isGeneratingFeedback && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30">
					<div className="flex flex-col items-center">
						<Lottie
							animationData={loadingSpinner}
							loop
							className="w-32 h-32"
						/>
						<p className="mt-4 text-lg text-gray-800 font-semibold">
							Generating feedback...
						</p>
					</div>
				</div>
			)}{" "}
		</section>
	);
};

export default InterviewVapiModel;
