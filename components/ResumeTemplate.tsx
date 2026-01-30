"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ResumeTemplateProps {
	imageSrc: string;
	imageAlt: string;
	title?: string;
	description: string;
}

const ResumeTemplate = ({
	imageSrc,
	imageAlt,
	title,
	description,
}: ResumeTemplateProps) => {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<div>
			<Card
				className="overflow-hidden bg-[#F4F7FB] p-10 border-0 rounded-2xl shadow-[0_20px_40px_rgba(15,23,42,0.10)] relative"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div
					className={`relative w-full aspect-3/4 transition-transform duration-300 ease-out ${
						isHovered ? "scale-105 -translate-y-2" : "scale-100"
					}`}
				>
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover rounded-[8px]"
					/>
					{isHovered && (
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[8px] transition-all duration-300">
							<Link
								href={"/"}
								className="bg-white hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
							>
								Choose this template
							</Link>
						</div>
					)}
				</div>
			</Card>
			<CardFooter className="flex flex-col items-start p-4">
				{title && (
					<h3 className="font-semibold text-2xl mb-1">{title}</h3>
				)}
				<p className="text-muted-foreground text-lg">{description}</p>
			</CardFooter>
		</div>
	);
};

export default ResumeTemplate;
