interface ScoreGaugeProps {
    score: number;
}

const ScoreGauge = ({ score }: ScoreGaugeProps) => {
    const getColorClasses = () => {
        if (score >= 80) return "text-green-500 border-green-500";
        if (score >= 50) return "text-yellow-500 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    const getStrokeColor = () => {
        if (score >= 80) return "stroke-green-500";
        if (score >= 50) return "stroke-yellow-500";
        return "stroke-red-500";
    };

    const radius = 50;
    const circumference = Math.PI * radius; // Half circle
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-20">
                <svg className="w-full h-full" viewBox="0 0 120 70">
                    <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        className="fill-none stroke-gray-200"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        className={`fill-none ${getStrokeColor()} transition-all duration-1000 ease-out`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span
                        className={`text-3xl font-bold ${getColorClasses().split(" ")[0]}`}
                    >
                        {score}
                    </span>
                    <span className="text-gray-500 text-xs">/100</span>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
