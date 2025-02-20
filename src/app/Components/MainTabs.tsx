import React, { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { jobApplications } from "../constants";
import { interviews } from "../constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";

// Helper function for formatting dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function MainTabs() {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState({
    id: "uuidv4()",
    jobTitle: "",
    companyName: "",
    status: "",
    applicationDate: new Date().toISOString().split("T")[0],
  });
  const [interviewFormData, setInterviewFormData] = useState({
    id: "uuidv4()",
    companyName: "",
    jobTitle: "",
    interviewDate: new Date().toISOString().split("T")[0],
    time: "",
  });

  const openApplicationModal = () => setIsApplicationModalOpen(true);
  const closeApplicationModal = () => setIsApplicationModalOpen(false);
  const openInterviewModal = () => setIsInterviewModalOpen(true);
  const closeInterviewModal = () => setIsInterviewModalOpen(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApplicationChange = (e: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: { name: any; value: any };
  }) => {
    setApplicationFormData({
      ...applicationFormData,
      [e.target.name]: e.target.value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInterviewChange = (e: { target: { name: any; value: any } }) => {
    setInterviewFormData({
      ...interviewFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplicationSubmit = () => {
    if (!applicationFormData.jobTitle || !applicationFormData.companyName) {
      alert("Please fill in all fields");
      return;
    }
    console.log("New Application:", { ...applicationFormData, id: uuidv4() });
    closeApplicationModal();
  };

  const handleInterviewSubmit = () => {
    if (
      !interviewFormData.companyName ||
      !interviewFormData.jobTitle ||
      !interviewFormData.time
    ) {
      alert("Please fill in all fields");
      return;
    }
    console.log("New Interview:", { ...interviewFormData, id: uuidv4() });
    closeInterviewModal();
  };

  const motionVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div>
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList className="primary-color">
          <TabsTrigger value="applications" className="text-[#070c15]">
            Applications
          </TabsTrigger>
          <TabsTrigger value="interviews" className="text-[#070c15]">
            Interviews
          </TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
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
            <div className="flex justify-between items-center mb-5 ">
              <h2 className="text-2xl text-[#070c15] font-bold">
                Recent Applications
              </h2>
              <Button onClick={openApplicationModal} className="primary-color">
                <Plus className="mr-2 h-4 w-4" /> Add Application
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobApplications.map((job) => (
                <Card key={job.id} className="">
                  <CardHeader>
                    <CardTitle className="text-[#070c15]">
                      {job.jobTitle}
                    </CardTitle>
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
                    <Button variant="ghost" className="text-[#070c15]">
                      View Details
                    </Button>
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
              <h2 className="text-2xl font-bold text-[#070c15]">
                Upcoming Interviews
              </h2>
              <Button onClick={openInterviewModal}>
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
      </Tabs>
      
{/* // Application Modal  */}
      <Dialog open={isApplicationModalOpen} onOpenChange={setIsApplicationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Job Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Job Title</Label>
            <Input name="jobTitle" value={applicationFormData.jobTitle} onChange={handleApplicationChange} />
            <Label>Company Name</Label>
            <Input name="companyName" value={applicationFormData.companyName} onChange={handleApplicationChange} />
            <Label>Application Date</Label>
            <Input type="date" name="applicationDate" value={applicationFormData.applicationDate} onChange={handleApplicationChange} />
          </div>
          <DialogFooter>
          <Badge variant="default" className="bg-blue-100 text-blue-500">Applied</Badge>
            <Button onClick={closeApplicationModal} variant="ghost">Cancel</Button>
            <Button onClick={handleApplicationSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Interview Modal */}
      <Dialog
        open={isInterviewModalOpen}
        onOpenChange={setIsInterviewModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Company Name</Label>
            <Input
              name="companyName"
              value={interviewFormData.companyName}
              onChange={handleInterviewChange}
            />
            <Label>Job Title</Label>
            <Input
              name="jobTitle"
              value={interviewFormData.jobTitle}
              onChange={handleInterviewChange}
            />
            <Label>Interview Date</Label>
            <Input
              type="date"
              name="interviewDate"
              value={interviewFormData.interviewDate}
              onChange={handleInterviewChange}
            />
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={interviewFormData.time}
              onChange={handleInterviewChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={closeInterviewModal} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleInterviewSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
