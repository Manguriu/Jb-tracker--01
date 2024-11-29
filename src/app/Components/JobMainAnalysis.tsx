import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, BarChart, Calendar, Award } from 'lucide-react'
import { Progress } from "@/components/ui/progress";
import { format } from 'date-fns';


interface JobApplication {
    id: string;
    companyName: string;
    jobTitle: string;
    applicationDate: Date;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  }
  
  interface Interview {
    id: string;
    companyName: string;
    jobTitle: string;
    date: Date;
    time: string;
  }

  interface JobMainAnalysisProps {
    jobApplications: JobApplication[];
    interviews: Interview[];
  }


export default function JobMainAnalysis({jobApplications, interviews}:JobMainAnalysisProps) {

  

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobApplications.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 this week
              </p>
              <Progress value={33} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
              <Progress value={24} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviews.length}</div>
              <p className="text-xs text-muted-foreground">
                Next: {format(interviews[0].date, 'MMM d')} at {interviews[0].time}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Application Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
              <Progress value={70} className="mt-2" />
            </CardContent>
          </Card>
        </div>
  )
}