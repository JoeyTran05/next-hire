import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Upload, Pen, Mic } from "lucide-react";

const NavBar = () => {
	return (
		<div className="flex justify-between items-center sticky top-0 px-12 mx-auto bg-linear-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-xl">
			<div className="flex justify-between items-center gap-10 my-2">
				<Link href={"/"} className="flex">
					<Image
						src={"/logo.png"}
						alt="logo"
						width={40}
						height={100}
					/>
					<h1 className="font-bold">NextHire</h1>
				</Link>
				<Link
					className="flex gap-1.5 text-sm font-medium items-center p-2 rounded-xl hover:bg-gray-200 transition"
					href={"/scanner"}
				>
					<Upload />
					AI Scanner
				</Link>
				<Link
					className="flex gap-1.5 text-sm font-medium items-center p-2 rounded-xl hover:bg-gray-200 transition"
					href={"/writer"}
				>
					<Pen />
					Resume Writer
				</Link>
				<Link
					className="flex gap-1.5 text-sm font-medium items-center p-2 rounded-xl hover:bg-gray-200 transition"
					href={"/practice"}
				>
					<Mic className="w-fit h-fit" />
					Interview Practice
				</Link>
			</div>
			<div className="flex gap-1.5">
				<SignedOut>
					<SignInButton>
						<Button variant="ghost" className="text-sm">
							Sign In
						</Button>
					</SignInButton>
					<Button>Get Started</Button>
				</SignedOut>
				<SignedIn>
					<Link
						className="text-sm font-medium p-3 mr-3 rounded-xl hover:bg-gray-200 transition"
						href={"/dashboard"}
					>
						Dashboard
					</Link>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default NavBar;
