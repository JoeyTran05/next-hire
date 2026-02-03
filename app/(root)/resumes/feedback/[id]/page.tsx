import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const ResumeFeedback = async ({ params }: RouteParams) => {
	const { id } = await params;
	const user = await currentUser();

	if (!user) return <RedirectToSignIn />;

	return <div>ResumeFeedback</div>;
};

export default ResumeFeedback;
