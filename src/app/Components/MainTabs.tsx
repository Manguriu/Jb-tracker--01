import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { motion } from "framer-motion";

const addJobApplication = () => {
  console.log("Add job application clicked");
};
const scheduleInterview = () => {
  console.log("Schedule interview clicked");
};

const jobApplications = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Applied",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    companyName: "Code Inc",
    applicationDate: new Date(),
    status: "Interview",
  },
  {
    id: 3,
    jobTitle: "Backend Developer",
    companyName: " Inc",
    applicationDate: new Date(),
    status: "Rejected",
  },
  {
    id: 4,
    jobTitle: "Backend Developer",
    companyName: " Inc",
    applicationDate: new Date(),
    status: "Offer",
  },
];

const interviews = [
  {
    id: 1,
    companyName: "Tech Corp",
    jobTitle: "Frontend Developer",
    date: new Date(),
    time: "10:00 AM",
  },
];

const applicationStatusData = [
  { name: "Applied", value: 5 },
  { name: "Interview", value: 3 },
  { name: "Offer", value: 1 },
  { name: "Rejected", value: 2 },
];

// Helper function for formatting dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function MainTabs() {
  const motionVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div>
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <motion.div
            key="applications"
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">Recent Applications</h2>
              <Button onClick={addJobApplication} >
                <Plus className="mr-2 h-4 w-4" /> Add Application
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobApplications.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.jobTitle}</CardTitle>
                    <CardDescription>{job.companyName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Applied on {formatDate(job.applicationDate)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge
                      variant="default"
                      className={
                        job.status === "Applied"
                          ? "bg-blue-100 text-blue-500"
                          : job.status === "Interview"
                          ? "bg-green-100 text-green-500"
                          : job.status === "Offer"
                          ? "bg-yellow-100 text-yellow-500"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-500"
                          : ""
                      }
                    >
                      {job.status}
                    </Badge>
                    <Button variant="ghost">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="interviews" className="space-y-4">
          <motion.div
            key="interviews"
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Interviews</h2>
              <Button onClick={scheduleInterview}>
                <Plus className="mr-2 h-4 w-4" /> Schedule Interview
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {interviews.map((interview) => (
                      <li
                        key={interview.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{interview.companyName}</p>
                          <p className="text-sm text-muted-foreground">
                            {interview.jobTitle}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatDate(interview.date)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {interview.time}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <motion.div
            key="analytics"
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Application Analytics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      applied: { label: "Applied", color: "blue" },
                      interview: { label: "Interview", color: "green" },
                      offer: { label: "Offer", color: "yellow" },
                      rejected: { label: "Rejected", color: "red" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={applicationStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {applicationStatusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "Applied"
                                  ? "#3b82f6" // Tailwind `blue-500`
                                  : entry.name === "Interview"
                                  ? "#22c55e" // Tailwind `green-500`
                                  : entry.name === "Offer"
                                  ? "#facc15" // Tailwind `yellow-500`
                                  : "#ef4444" // Tailwind `red-500`
                              }
                            />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Application Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span>Average Response Time</span>
                      <span className="font-medium">5 days</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Most Applied Job Title</span>
                      <span className="font-medium">Frontend Developer</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Top Application Source</span>
                      <span className="font-medium">LinkedIn</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
