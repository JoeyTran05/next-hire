import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="">
			<NavBar />
			<div className="pt-14">{children}</div>
		</div>
	);
};

export default Layout;
