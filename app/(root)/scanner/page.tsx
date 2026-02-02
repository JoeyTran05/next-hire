"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { toast } from "sonner";
import { Briefcase, Building2, FileSearchCorner, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createResume } from "@/lib/actions/resume.actions";

const formSchema = z.object({
	jobTitle: z
		.string()
		.min(5, "Job title must be at least 5 characters.")
		.max(32, "Job title must be at most 32 characters."),
	companyName: z
		.string()
		.min(2, "Company name must be at least 2 characters.")
		.max(32, "Company name must be at most 32 characters."),
	jobDescription: z
		.string()
		.min(20, "Description must be at least 20 characters.")
		.max(100, "Description must be at most 100 characters."),
	resume: z
		.instanceof(File, { message: "Resume is not uploaded." })
		.refine((file) => file && file.size <= 5 * 1024 * 1024, {
			message: "Resume must be less than 5MB.",
		}),
});

const Scanner = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			jobTitle: "",
			companyName: "",
			jobDescription: "",
			resume: undefined,
		},
	});

	const [isDragging, setIsDragging] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		toast("Resume submitted successfully!");
		setIsAnalyzing(true);

		const resume = await createResume(data);

		if (resume) {
			router.push("/scanner/result");
			console.log("Resume created:", resume);
		} else {
			console.log("Failed to create resume", resume);
			router.push("/");
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent, onChange: (file: File) => void) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files?.[0];
		if (file) {
			onChange(file);
		}
	};

	const handleFileUpload = (onChange: (file: File) => void) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".pdf";
		input.onchange = () => {
			const file = input.files?.[0];
			if (file) onChange(file);
		};
		input.click();
	};

	return (
		<main className="relative overflow-hidden flex items-center justify-center min-h-screen pt-12">
			{isAnalyzing ? (
				<div className="flex flex-col items-center justify-center gap-4">
					<motion.div
						className="w-20 h-20 bg-linear-to-br from-teal-500 via-cyan-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1, repeat: Infinity }}
					>
						<Upload className="w-10 h-10 text-white" />
					</motion.div>
					<motion.h3
						className="text-xl font-bold text-gray-900"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>
						Analyzing Your Resume...
					</motion.h3>
					<motion.p
						className="text-gray-600"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							delay: 0.5,
						}}
					>
						Our AI is processing your submission. Please wait.
					</motion.p>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mb-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold">
							AI Resume Scanner
						</h1>
						<p className="mt-4 text-lg text-gray-600">
							Upload your resume and let our AI analyze it for
							improvements
						</p>
					</div>
					<div className="w-full max-w-2xl">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg font-bold">
									<Briefcase />
									Job Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form
									id="form-resume"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FieldGroup>
										<Controller
											name="jobTitle"
											control={form.control}
											render={({ field, fieldState }) => (
												<Field
													data-invalid={
														fieldState.invalid
													}
												>
													<FieldLabel htmlFor="form-resume-jobTitle">
														Job Title
													</FieldLabel>
													<div className="relative">
														<FileSearchCorner className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
														<Input
															{...field}
															id="form-resume-jobTitle"
															placeholder="e.g.,Senior Software Engineer"
															className="pl-9"
															aria-invalid={
																fieldState.invalid
															}
														/>
													</div>
													{fieldState.invalid && (
														<FieldError
															errors={[
																fieldState.error,
															]}
														/>
													)}
												</Field>
											)}
										/>
										<Controller
											name="companyName"
											control={form.control}
											render={({ field, fieldState }) => (
												<Field
													data-invalid={
														fieldState.invalid
													}
												>
													<FieldLabel htmlFor="form-resume-companyName">
														Company Name
													</FieldLabel>
													<div className="relative">
														<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
														<Input
															{...field}
															id="form-resume-companyName"
															placeholder="e.g., Google, Microsoft, Apple"
															className="pl-9"
															aria-invalid={
																fieldState.invalid
															}
														/>
													</div>
													{fieldState.invalid && (
														<FieldError
															errors={[
																fieldState.error,
															]}
														/>
													)}
												</Field>
											)}
										/>
										<Controller
											name="jobDescription"
											control={form.control}
											render={({ field, fieldState }) => (
												<Field
													data-invalid={
														fieldState.invalid
													}
												>
													<FieldLabel htmlFor="form-resume-jobDescription">
														Job Description
													</FieldLabel>
													<InputGroup>
														<InputGroupTextarea
															{...field}
															id="form-resume-jobDescription"
															placeholder="Paste the job description here to get tailored resume suggestions."
															rows={6}
															className="min-h-24 resize-none"
															aria-invalid={
																fieldState.invalid
															}
														/>
													</InputGroup>
													{fieldState.invalid && (
														<FieldError
															errors={[
																fieldState.error,
															]}
														/>
													)}
												</Field>
											)}
										/>
									</FieldGroup>
								</form>
							</CardContent>
							<CardFooter>
								<Field orientation="horizontal">
									<Button
										type="button"
										variant="outline"
										onClick={() => form.reset()}
									>
										Reset
									</Button>
									<Button type="submit" form="form-resume">
										Analyze Resume
									</Button>
								</Field>
							</CardFooter>
						</Card>
					</div>
					<div className="w-full max-w-2xl mt-8">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg font-bold">
									<Upload />
									Upload Resume
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Controller
									name="resume"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											data-invalid={fieldState.invalid}
										>
											<div
												className={`bg-white rounded-2xl shadow-xl p-8 border-dashed border-4 border-cyan-100 transition-all cursor-pointer ${
													isDragging
														? "border-teal-500 bg-teal-50"
														: "border-gray-300 hover:border-teal-400 hover:bg-teal-50"
												}`}
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={(e) =>
													handleDrop(
														e,
														field.onChange,
													)
												}
												onClick={() =>
													handleFileUpload(
														field.onChange,
													)
												}
											>
												<div className="space-y-4 text-center">
													<div className="w-20 h-20 bg-linear-to-br from-teal-500 via-cyan-500 to-sky-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
														<Upload className="w-10 h-10 text-white" />
													</div>
													<h3 className="text-xl font-bold text-gray-900">
														Upload Your Resume
													</h3>
													<p className="text-gray-600">
														Drag & drop your resume
														here, or click to browse
													</p>
													<p className="text-sm text-gray-500">
														PDF • Max 5MB
													</p>

													{field.value && (
														<p className="text-sm font-medium text-teal-600">
															Selected:{" "}
															{field.value.name}
														</p>
													)}
												</div>
											</div>

											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</main>
	);
};

export default Scanner;
