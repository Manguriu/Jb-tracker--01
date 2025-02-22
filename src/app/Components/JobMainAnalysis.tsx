import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart, Calendar, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays, subDays, isAfter } from "date-fns";

interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  applicationDate: Date;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
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

export default function JobMainAnalysis({
  jobApplications,
  interviews,
}: JobMainAnalysisProps) {
  //total applications
  const totalApplications = jobApplications.length;

  const oneWeekAgo = subDays(new Date(), 7);
  const applicationsThisWeek = jobApplications.filter((app) =>
    isAfter(new Date(app.applicationDate), oneWeekAgo)
  ).length;

  //streak
  // Sort applications by date setting most recent first)
  const sortedApplications = [...jobApplications]
    .map((app) => new Date(app.applicationDate))
    .sort((a, b) => b.getTime() - a.getTime());

  //fucnction streak calculation
  const calculateStreak = () => {
    if (sortedApplications.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedApplications.length - 1; i++) {
      const currentDay = sortedApplications[i];
      const previousDay = sortedApplications[i + 1];

      const diff = differenceInDays(currentDay, previousDay);

      if (diff === 1) {
        streak++; // Continue streak
      } else if (diff > 1) {
        break; // Streak is broken
      }
    }

    // Check if today is part of the streak
    if (differenceInDays(today, sortedApplications[0]) > 1) {
      streak = 0; // Reset if no application today
    }

    return streak;
  };

  const streak = calculateStreak();

  // **Calculate Success Rate**
  const successfulApplications = jobApplications.filter(
    (app) => app.status === "Interview" || app.status === "Offer"
  ).length;

  const successRate =
    totalApplications > 0
      ? (successfulApplications / totalApplications) * 100
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <Card className="bg-gradient-to-r from-[#d170c6] via-[#c894dd] to-[#4a80c5]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Applications
          </CardTitle>
          <Briefcase className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApplications}</div>
          <p className="text-xs text-muted-foreground">
            +{applicationsThisWeek} this week
          </p>
          <Progress
            value={(applicationsThisWeek / totalApplications) * 100}
            className="mt-2 bg-slate-200" 
          />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-[#d170c6] via-[#c894dd] to-[#4a80c5]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {successfulApplications} successful applications
          </p>
          <Progress value={successRate} className="mt-2 bg-slate-200" />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-[#d170c6] via-[#c894dd] to-[#4a80c5]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Interviews
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{interviews.length}</div>
          {interviews.length > 0 ? (
            <p className="text-xs text-muted-foreground">
              Next: {format(new Date(interviews[0].date), "MMM d")} at{" "}
              {interviews[0].time}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              No upcoming interviews
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-[#d170c6] via-[#c894dd] to-[#4a80c5]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Application Streak
          </CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{streak} days</div>
          <p className="text-xs text-muted-foreground">
            {streak > 0 ? "Keep it up!" : "Start a new streak today!"}
          </p>
          <Progress value={streak * 10} className="mt-2 bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}
