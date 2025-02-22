import { subDays } from "date-fns";

export const jobApplications = [
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
    applicationDate: subDays(new Date(), 1),
    status: "Interview",
  },
  {
    id: 3,
    jobTitle: "Backend Developer",
    companyName: " Inc",
    applicationDate: subDays(new Date(), 2),
    status: "Rejected",
  },
  {
    id: 4,
    jobTitle: "Backend Developer",
    companyName: " Inc",
    applicationDate: subDays(new Date(), 3),
    status: "Offer",
  },

  {
    id: 5,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Offer",
  },
  {
    id: 6,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Applied",
  },
  {
    id: 7,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Applied",
  },
  {
    id: 8,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Applied",
  },
  {
    id: 9,
    jobTitle: "Frontend Developer",
    companyName: "Tech Corp",
    applicationDate: new Date(),
    status: "Offer",
  },
];

export const interviews = [
  {
    id: 1,
    companyName: "Tech Corp",
    jobTitle: "Frontend Developer",
    date: new Date(),
    time: "10:00 AM",
  },
  {
    id: 2,
    companyName: "Tech Corp",
    jobTitle: "Frontend Developer",
    date: new Date(),
    time: "10:00 AM",
  },
  {
    id: 3,
    companyName: "Tech Corp",
    jobTitle: "Frontend Developer",
    date: new Date(),
    time: "10:00 AM",
  },
];
