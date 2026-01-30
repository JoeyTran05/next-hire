import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  highlight: boolean
}

const FeatureCard = ({icon: Icon, title, description, highlight }: FeatureCardProps) => {
  return (
        <div className={`p-6 group border-2 
            ${highlight ? "border-cyan-500 bg-white" : "bg-gray-200"} rounded-lg shadow-[0_10px_30px_rgba(56,189,248,0.15)] flex flex-col gap-6 items-center transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_50px_rgba(56,189,248,0.35)] hover:border-sky-300/70 hover:-translate-y-2 `}>
                {highlight && (
                    <span className='text-xs px-2 py-1 bg-yellow-300 text-yellow-900 rounded-full font-bold uppercase'> Top Feature </span>
                )}

   
                    <Icon className="w-10 h-10 text-sky-500" />
                    <h3 className="text-2xl font-bold">
                        {title}
                    </h3>

            <div className="-mt-3">
                <p className="text-lg text-gray-500 font-semibold text-center">
                    {description}
                </p>
            </div>
		</div>
  )
}

export default FeatureCard