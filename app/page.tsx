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
import { Upload, PenTool, Mic, Star } from "lucide-react";
import Link from "next/link";
import { reviews } from "@/constants/user-reviews";
import Image from "next/image";

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
				<div className="flex gap-8 mt-15 w-4/5 mx-auto">
					{/* AI Resume Scanner */}
					<Card className="group border border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col justify-between w-1/3 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(56,189,248,0.35)] hover:border-sky-300/70 hover:-translate-y-2">
						<CardHeader>
							<CardTitle className="flex flex-col items-start gap-4">
								<div className="p-4 bg-linear-to-br from-cyan-400 to-sky-500 rounded-2xl transition-transform duration-300 group-hover:scale-110">
									<Upload className="w-10 h-10 text-white" />
								</div>
								<h3 className="text-2xl font-bold">
									Resume Scanner
								</h3>
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-1xl text-gray-500 font-semibold">
								Upload your PDF resume and get instant
								AI-powered feedbacks
							</p>
						</CardContent>

						<CardFooter>
							<Link
								href="/scanner"
								className="text-2xl text-blue-500 font-medium transition-transform duration-300 group-hover:translate-x-2"
							>
								Get Started →
							</Link>
						</CardFooter>
					</Card>

					{/* Resume Writer */}
					<Card className="group border border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col justify-between w-1/3 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(56,189,248,0.35)] hover:border-sky-300/70 hover:-translate-y-2">
						<CardHeader>
							<CardTitle className="flex flex-col items-start gap-4">
								<div className="p-4 bg-linear-to-br from-sky-400 to-purple-500 rounded-2xl transition-transform duration-300 group-hover:scale-110">
									<PenTool className="w-10 h-10 text-white" />
								</div>
								<h3 className="text-2xl font-bold">
									Resume Writing Help
								</h3>
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-1xl text-gray-500 font-semibold">
								Get professional guidance and tips to write an
								outstanding resume
							</p>
						</CardContent>

						<CardFooter>
							<Link
								href="/writer"
								className="text-2xl text-blue-500 font-medium transition-transform duration-300 group-hover:translate-x-2"
							>
								Get Started →
							</Link>
						</CardFooter>
					</Card>

					{/* Interview Practice */}
					<Card className="group border border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col justify-between w-1/3 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(56,189,248,0.35)] hover:border-sky-300/70 hover:-translate-y-2">
						<CardHeader>
							<CardTitle className="flex flex-col items-start	gap-4">
								<div className="p-4 bg-linear-to-br from-violet-400 to-purple-500 rounded-2xl transition-transform duration-300 group-hover:scale-110">
									<Mic className="w-10 h-10 text-white" />
								</div>
								<h3 className="text-2xl font-bold">
									Interview Practice
								</h3>
							</CardTitle>
						</CardHeader>

						<CardContent>
							<p className="text-1xl text-gray-500 font-semibold">
								Practice your interview skills with AI-generated
								questions and feedback
							</p>
						</CardContent>

						<CardFooter>
							<Link
								href="/interview"
								className="text-2xl text-blue-500 font-medium transition-transform duration-300 group-hover:translate-x-2"
							>
								Get Started →
							</Link>
						</CardFooter>
					</Card>
				</div>

				{/* Carousel Section */}
				<div className="mt-15 w-4/5 mx-auto">
					<Carousel className="w-full">
						<CarouselContent className="-ml-4">
							<CarouselItem className="pl-4 py-8">
								<div className="p-2">
									<Card className="border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] p-12 rounded-2xl">
										<h2 className="text-center text-4xl font-bold mb-8">
											Why Choose Our Platform?
										</h2>

										<div className="flex justify-evenly">
											<div className="flex items-start gap-3 bg-blue-50 p-6 rounded-3xl w-1/3">
												<div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
													<span className="text-white text-sm">
														✓
													</span>
												</div>
												<div>
													<h3 className="text-xl font-bold mb-2">
														Smart AI Analysis
													</h3>
													<p className="text-gray-500">
														Get instant AI-powered
														feedback on your resume
													</p>
												</div>
											</div>
											<div className="flex items-start gap-3 bg-blue-50 p-6 rounded-3xl w-1/3">
												<div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
													<span className="text-white text-sm">
														✓
													</span>
												</div>
												<div>
													<h3 className="text-xl font-bold mb-2">
														95% Success Rate
													</h3>
													<p className="text-gray-500">
														Proven increase in
														interview callbacks
													</p>
												</div>
											</div>
										</div>
									</Card>
								</div>
							</CarouselItem>

							<CarouselItem className="pl-4 py-8">
								<div className="p-2">
									<Card className="border-sky-200/50 shadow-[0_10px_30px_rgba(56,189,248,0.15)] p-12 rounded-2xl">
										<h2 className="text-center text-4xl font-bold mb-8">
											Why Choose Our Platform?
										</h2>

										<div className="flex justify-evenly">
											<div className="flex items-start gap-3 bg-blue-50 p-6 rounded-3xl w-1/3">
												<div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
													<span className="text-white text-sm">
														✓
													</span>
												</div>
												<div>
													<h3 className="text-xl font-bold mb-2">
														Interview Practice
													</h3>
													<p className="text-gray-500">
														AI-generated questions
														with real-time feedback
													</p>
												</div>
											</div>
											<div className="flex items-start gap-3 bg-blue-50 p-6 rounded-3xl w-1/3">
												<div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
													<span className="text-white text-sm">
														✓
													</span>
												</div>
												<div>
													<h3 className="text-xl font-bold mb-2">
														ATS-Friendly Templates
													</h3>
													<p className="text-gray-500">
														Professional templates
														optimized for applicant
														tracking systems
													</p>
												</div>
											</div>
										</div>
									</Card>
								</div>
							</CarouselItem>
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
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
