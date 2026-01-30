import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

const dashboard = () => {
  return (
    <div>
        <h1 className="text-4xl font-bold text-center mt-12">
            Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
            Welcome to your dashboard! Here you can manage your account and settings.
        </p>

        <div className='px-10 mt-10 grid grid-cols-2'>
            <div className="grid grid-cols-3 gap-5">
                <Card className='p-5'>
                    <CardTitle>Avg Resume Score</CardTitle>
                    <CardContent>50/50</CardContent>
                </Card>

                <Card className='p-5'>
                    <CardTitle>Avg Interview Score</CardTitle>
                    <CardContent>50/50</CardContent>
                </Card>

                <Card className='p-5'>
                    <CardTitle>Avg Interview Score</CardTitle>
                    <CardContent>50/50</CardContent>
                </Card>

                <Card className='p-5'>
                    <CardTitle>Avg Interview Score</CardTitle>
                    <CardContent>50/50</CardContent>
                </Card>

                <Card className='p-5'>
                    <CardTitle>Resume Version</CardTitle>
                    <CardContent>5 versions</CardContent>
                </Card>

                <Card className='p-5'>
                    <CardTitle>Interview Practice Session</CardTitle>
                    <CardContent>5 sessions</CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default dashboard