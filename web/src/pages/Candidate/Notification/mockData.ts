import type { Notification } from "./types"

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "Applied",
    title: "Your application has been received!",
    content:
      "Hi John Doe,\n\nWe've successfully received your application for the Senior Software Engineer position.\n\nThank you for your interest in joining our team. We're currently reviewing all applications and will get back to you within 5 business days.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-18T10:30:00",
    isRead: false,
    jobTitle: "Senior Software Engineer"
  },
  {
    id: "2",
    type: "Shortlisted",
    title: "You've been shortlisted for Full Stack Developer!",
    content:
      "Great news, John Doe!\n\nYou've been shortlisted for the Full Stack Developer role based on your experience and skills.\n\nOur hiring team will contact you soon to schedule an interview. Please keep an eye on your email and phone for further communication.\n\nWe look forward to speaking with you!\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-17T14:20:00",
    isRead: false,
    jobTitle: "Full Stack Developer"
  },
  {
    id: "3",
    type: "Interview Scheduled",
    title: "Interview scheduled for Lead Engineer position",
    content:
      "Hi John Doe,\n\nWe're excited to invite you for an interview for the Lead Engineer position!\n\nInterview Details:\n📅 Date: October 22, 2025\n🕐 Time: 2:00 PM - 3:00 PM (PST)\n📍 Location: Virtual (Zoom link will be sent separately)\n👥 Interviewers: Sarah Johnson (Tech Lead), Mike Chen (Engineering Manager)\n\nPlease confirm your availability by replying to this notification.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-16T09:15:00",
    isRead: true,
    jobTitle: "Lead Engineer"
  },
  {
    id: "4",
    type: "Interviewed",
    title: "Thank you for your interview",
    content:
      "Hi John Doe,\n\nThank you for taking the time to interview for the Backend Developer position on October 15, 2025.\n\nWe appreciate your interest in joining our team and the time you invested in the interview process. Our team is currently reviewing all candidates and will make a decision within the next week.\n\nWe'll be in touch soon with an update on your application status.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-15T16:45:00",
    isRead: true,
    jobTitle: "Backend Developer"
  },
  {
    id: "5",
    type: "Interview Cancelled",
    title: "Interview rescheduling required",
    content:
      "Hi John Doe,\n\nWe regret to inform you that we need to reschedule your interview for the DevOps Engineer position originally scheduled for October 20, 2025.\n\nReason: The hiring manager has an unexpected conflict.\n\nWe apologize for any inconvenience this may cause. Our recruitment team will reach out to you within 24 hours to arrange a new interview time that works for both parties.\n\nThank you for your understanding.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-14T11:30:00",
    isRead: true,
    jobTitle: "DevOps Engineer"
  },
  {
    id: "6",
    type: "Rejected",
    title: "Update on your application for Frontend Developer",
    content:
      "Hi John Doe,\n\nThank you for your interest in the Frontend Developer position and for taking the time to interview with us.\n\nAfter careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.\n\nWe were impressed by your skills and experience, and we encourage you to apply for future openings that match your qualifications. We'll keep your resume on file for 6 months.\n\nWe wish you the best in your job search.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-13T10:00:00",
    isRead: true,
    jobTitle: "Frontend Developer"
  },
  {
    id: "7",
    type: "Offered",
    title: "Job Offer - Senior Full Stack Engineer",
    content:
      "Congratulations, John Doe!\n\nWe are delighted to offer you the position of Senior Full Stack Engineer at SmartHire!\n\nOffer Details:\n💼 Position: Senior Full Stack Engineer\n💰 Salary: $140,000/year\n📅 Start Date: November 15, 2025\n🏖️ Benefits: Health insurance, 401(k), 20 days PTO, remote work options\n\nPlease review the attached offer letter and respond within 5 business days. If you have any questions, feel free to reach out to our HR team.\n\nWe're excited to have you join our team!\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-12T15:20:00",
    isRead: false,
    jobTitle: "Senior Full Stack Engineer"
  },
  {
    id: "8",
    type: "Applied",
    title: "Application confirmation",
    content:
      "Hi John Doe,\n\nWe've successfully received your application for the Data Engineer position.\n\nThank you for your interest in joining our team. We're currently reviewing all applications and will get back to you within 5 business days.\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-11T13:45:00",
    isRead: true,
    jobTitle: "Data Engineer"
  },
  {
    id: "9",
    type: "Shortlisted",
    title: "You've been shortlisted for Mobile Developer!",
    content:
      "Great news, John Doe!\n\nYou've been shortlisted for the Mobile Developer role based on your experience and skills.\n\nOur hiring team will contact you soon to schedule an interview. Please keep an eye on your email and phone for further communication.\n\nWe look forward to speaking with you!\n\nBest regards,\nSmartHire Recruitment Team",
    dateTime: "2025-10-10T09:30:00",
    isRead: true,
    jobTitle: "Mobile Developer"
  }
]

// Mock API functions
export const fetchNotifications = async (): Promise<Notification[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockNotifications
}

export const removeNotification = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log("Removing notification:", id)
  // In real implementation, this would call the actual API
}

export const markNotificationAsRead = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))
  console.log("Marking notification as read:", id)
  // In real implementation, this would call the actual API
}
