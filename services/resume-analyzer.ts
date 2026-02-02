const AIResponseFormat = `
      interface FeedbackFormat {
        overallScore: number; // Score from 0 to 100
        ATS: {
                score: number; // Rate based on ATS suitability
                tips: {
                        type: "good" | "improve";
                        tip: string; // Give 3 to 4 tips
                }[]
        };
        toneAndStyle: {
                score: number; // Rate based on tone and style
                tips: {
                        type: "good" | "improve";
                        tip: string; // Give 3 to 4 tips
                }[]
        }
      }`

const prepareInstructions = (jobTitle: string, jobDescription: string, companyName: string) => {
    const instruction =
        `You are an expert in ATS (Applicant Tracking System) and resume analysis.
         Please analyze the following resume and suggest how to improve it.
         The rating can be low if the resume is bad.
         Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
         If there is a lot to improve, don't hesitate to give low scores. This is to help the users to improve their resumes.
         If available, use the job description for the job user is applying for to give more tailored suggestions and feedbacks.
         The job title is: ${jobTitle}.
         The job description is: ${jobDescription}.
         Provide the feedback using the following format:
         
         Return the analysis as an JSON object, without any other text and without the backticks.
         Do not include any other texts or comments.`
}