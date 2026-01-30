import React from 'react'
import {resumeTemplates} from '@/constants/resume-template'
import ResumeTemplate from '@/components/ResumeTemplate'

const writer = () => {
  return (
    <div className="mt-12">
      <div className="text-center">
          <h1 className="text-4xl font-bold">
            Resume Templates
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Simple to use and professional resume templates to help you stand out.
          </p>
			</div>
      
      <div className="grid grid-cols-3 gap-8 p-12">
        {resumeTemplates.map(template => (
          <ResumeTemplate key={template.id}
          imageSrc={template.imageSrc}
          imageAlt={template.imageAlt}
          title={template.title}
          description={template.description}
          />
        ))}
      </div>
    </div>
  )
}

export default writer