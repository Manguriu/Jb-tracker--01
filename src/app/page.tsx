
"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Lock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import JobMainAnalysis from "./Components/JobMainAnalysis";
import MainTabs from "./Components/MainTabs";
import Resource from "./Components/Resource";
import Footer from "./Components/Footer";

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

export default function page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: "1",
      companyName: "TechCorp",
      jobTitle: "Frontend Developer",
      applicationDate: new Date(2024, 0, 15),
      status: "Interview",
    },
    {
      id: "2",
      companyName: "DataSystems",
      jobTitle: "Data Analyst",
      applicationDate: new Date(2024, 0, 20),
      status: "Applied",
    },
    {
      id: "3",
      companyName: "CloudNet",
      jobTitle: "DevOps Engineer",
      applicationDate: new Date(2024, 0, 25),
      status: "Rejected",
    },
    {
      id: "4",
      companyName: "AI Innovations",
      jobTitle: "Machine Learning Engineer",
      applicationDate: new Date(2024, 1, 1),
      status: "Offer",
    },
  ]);

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "1",
      companyName: "TechCorp",
      jobTitle: "Frontend Developer",
      date: addDays(new Date(), 2),
      time: "10:00 AM",
    },
    {
      id: "2",
      companyName: "AI Innovations",
      jobTitle: "Machine Learning Engineer",
      date: addDays(new Date(), 5),
      time: "2:00 PM",
    },
  ]);

  const applicationStatusData = [
    {
      name: "Applied",
      value: jobApplications.filter((job) => job.status === "Applied").length,
      color: "#3b82f6",
    },
    {
      name: "Interview",
      value: jobApplications.filter((job) => job.status === "Interview").length,
      color: "#10b981",
    },
    {
      name: "Offer",
      value: jobApplications.filter((job) => job.status === "Offer").length,
      color: "#f59e0b",
    },
    {
      name: "Rejected",
      value: jobApplications.filter((job) => job.status === "Rejected").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="bg-[#f9fafd] min-h-screen p-4 ">
      <div className="max-w-7xl mx-auto space-y-8 p-2">
        <div className="p-2 flex justify-between items-center ">
          <div className="">
            <h1 className="mt-2 font-bold h1 text-3xl text-gray-900">
              Job Tracker
            </h1>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  John Doe
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Privacy Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <JobMainAnalysis 
            jobApplications={jobApplications} 
            interviews={interviews} 
          />
        </div>
        <div><MainTabs /></div>
        <div><Resource /></div>
        <div><Footer /></div>
      </div>
    </div>
  );
}

// Function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
