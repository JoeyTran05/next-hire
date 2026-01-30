import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Upload, PenTool, Mic, Star, BookOpenText } from "lucide-react";
import Link from "next/link";
import { reviews } from "@/constants/user-reviews";
import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";

const features = [
	{
		id: 1,
		icon: Upload,
		title: "Resume Scanner",
		description: "Upload your PDF resume and get instant AI-powered feedbacks",
		highlight: true
	},
	{
		id: 2,
		icon: PenTool,
		title: "Resume Writing Help",
		description: "Get professional guidance and tips to write an outstanding resume",
		highlight: true
	},
	{
		id: 3,
		icon: Mic,
		title: "Interview Practice",
		description: "Practice your interview skills with AI-generated questions and feedback",
		highlight: true
	},
	{
		id: 4,
		icon: BookOpenText,
		title: "100+ Resume Templates",
		description: "Choose from a variety of modern and ATS-friendly resume templates",
		highlight: false
	},
	{
		id: 5,
		icon: BookOpenText,
		title: "100+ Resume Templates",
		description: "Choose from a variety of modern and ATS-friendly resume templates",
		highlight: false
	},
	{
		id: 6,
		icon: BookOpenText,
		title: "100+ Resume Templates",
		description: "Choose from a variety of modern and ATS-friendly resume templates",
		highlight: false
	}
]

const Home = () => {
	return (
		<main className="relative overflow-hidden min-h-screen pt-16">
			<NavBar />

			{/* Page Header Section */}
			<div className="mt-12">
				<h1 className="text-center text-4xl font-bold">
					Elevate Your Career With{" "}
					<span className="bg-linear-to-r from-cyan-400 via-sky-500 to-purple-500 bg-clip-text text-transparent">
						AI-Powered
					</span>{" "}
					Resume Tools
				</h1>

				<h2 className="text-center w-1/2 mx-auto mt-5 text-gray-500 text-1x1 font-medium">
					Get expert AI assistance to create, improve, and perfect
					your resume. Stand out from the competition and land your
					dream job.
				</h2>

				{/* Upload Resume Banner Section */}
				<div className="mt-15 mx-auto p-10 w-4/5 rounded-3xl bg-linear-to-r from-sky-400 via-cyan-400 to-purple-500 flex justify-between items-center">
					<div className="flex gap-6 items-center">
						<div className="p-4 bg-[#4DC8F7] border-3 border-white/50 rounded-2xl">
							<Upload className="w-11 h-11 text-white" />
						</div>

						<div className="flex flex-col gap-2">
							<h3 className="text-3xl font-bold text-white">
								Upload Your Resume Now
							</h3>
							<h3 className="text-white/80">
								Click here to get instant AI-powered analysis
								and feedback
							</h3>
						</div>
					</div>

					<div>
						<Button className="rounded-2xl border-3 border-white/40 bg-white/20 p-8 text-white backdrop-blur-sm text-2xl font-semibold">
							Get Started
						</Button>
					</div>
				</div>

				{/* Feature Cards Section */}
				<h1 className="text-center text-4xl font-bold mt-15 animate-bounce">
					Why NextHire?
				</h1>
				<p className="text-gray-600 text-center mt-4 text-xl">Tools designed to help you master every interview with AI</p>

				<div className="grid grid-cols-3 gap-8 mt-10 w-4/5 mx-auto">
					{features.map(feature => (
						<FeatureCard key={feature.id} 
									 icon={feature.icon}
									 title={feature.title}
									 description={feature.description}
									 highlight={feature.highlight}
									  />
					))}
					
				</div>


				{/* User Reviews Section */}
				<div className="mt-15 mb-7">
					<h1 className="text-center text-4xl font-bold">
						What Our Customers Are Saying
					</h1>

					<div className="mt-12 w-4/5 mx-auto grid grid-cols-3 gap-7">
						{reviews.map((review) => (
							<Card
								key={review.id}
								className="border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] rounded-2xl"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-3">
										<Image
											src={review.avatar}
											alt={review.name}
											width={60}
											height={60}
										/>
										<div className="flex flex-col gap-0.5">
											<h3 className="font-semibold text-2xl">
												{review.name}
											</h3>
											<h4 className="text-gray-500">
												{review.role}
											</h4>
										</div>
									</CardTitle>
								</CardHeader>

								<CardContent className="-mt-3">
									<p className="text-xl">{review.review}</p>
								</CardContent>

								<CardFooter className="mt-auto">
									<div className="flex gap-1">
										{[...Array(5)].map((_, i) => {
											const filled = i < review.rating;
											return (
												<Star
													key={i}
													className={
														filled
															? "h-5 w-5 fill-yellow-400 text-yellow-400"
															: "h-5 w-5 text-slate-300"
													}
												/>
											);
										})}
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
