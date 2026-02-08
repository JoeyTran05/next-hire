interface ResumeCategoryScoreProps {
    title: string;
    score: number;
}

const ResumeCategoryScore = ({ title, score }: ResumeCategoryScoreProps) => {
    const getScoreColor = () => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const getBadgeStyles = () => {
        if (score >= 80)
            return {
                bg: "bg-green-100",
                text: "text-green-700",
                label: "Strong",
            };
        if (score >= 50)
            return {
                bg: "bg-yellow-100",
                text: "text-yellow-700",
                label: "Medium",
            };
        return {
            bg: "bg-red-100",
            text: "text-red-700",
            label: "Needs Work",
        };
    };

    const badgeStyles = getBadgeStyles();

    return (
        <div className="flex items-center justify-between py-4 px-6 bg-sky-100 rounded-lg">
            <div className="flex items-center gap-4">
                <h4 className="text-lg font-semibold">{title}</h4>
                <span
                    className={`${badgeStyles.bg} ${badgeStyles.text} text-sm font-semibold px-3 py-1 rounded-full`}
                >
                    {badgeStyles.label}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className={`text-xl font-bold ${getScoreColor()}`}>
                    {score}
                </span>
                <span className="text-xl">/ 100</span>
            </div>
        </div>
    );
};

export default ResumeCategoryScore;
