// Mock API for chatbot functionality

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary: string
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    description: "Looking for an experienced React developer",
    salary: "$120k - $150k"
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    description: "Join our fast-growing startup",
    salary: "$100k - $130k"
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Solutions Inc",
    location: "New York, NY",
    description: "Manage our cloud infrastructure",
    salary: "$110k - $140k"
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Austin, TX",
    description: "Create beautiful user experiences",
    salary: "$90k - $120k"
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "Enterprise Solutions",
    location: "Boston, MA",
    description: "Build scalable backend systems",
    salary: "$105k - $135k"
  }
]

/**
 * Fetch all open job positions
 */
export async function fetchOpenJobs(): Promise<
  Array<{
    id: string
    title: string
    company: string
    location: string
  }>
> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return mockJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location
  }))
}

/**
 * Send a message to the chatbot and get a response
 */
export async function sendChatMessage(message: string, file?: File | null): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const lowerMessage = message.toLowerCase()

  // Handle CV upload
  if (file) {
    return `Thank you for uploading your CV (${file.name}). I've received it and our HR team will review it shortly. Based on your profile, I can help you find matching job opportunities. Would you like to see available positions?`
  }

  // Handle various queries
  if (lowerMessage.includes("benefits") || lowerMessage.includes("benefit")) {
    return "We offer comprehensive benefits including:\n\n• Health, Dental, and Vision Insurance\n• 401(k) with company match\n• Flexible PTO policy\n• Remote work options\n• Professional development budget\n• Wellness programs\n\nWould you like to know more about any specific benefit?"
  }

  if (lowerMessage.includes("interview") || lowerMessage.includes("process")) {
    return "Our interview process typically includes:\n\n1. Initial phone screening (30 mins)\n2. Technical assessment\n3. Team interview (1 hour)\n4. Final interview with hiring manager\n\nThe entire process usually takes 2-3 weeks. Do you have any specific questions about the process?"
  }

  if (lowerMessage.includes("culture") || lowerMessage.includes("environment")) {
    return "Our company culture values:\n\n• Innovation and creativity\n• Work-life balance\n• Diversity and inclusion\n• Continuous learning\n• Collaborative teamwork\n\nWe have a hybrid work model and regular team events. Would you like to learn more?"
  }

  if (lowerMessage.includes("salary") || lowerMessage.includes("compensation")) {
    return "Our compensation packages are competitive and include:\n\n• Base salary based on experience\n• Performance bonuses\n• Stock options (for certain roles)\n• Annual reviews and raises\n\nSalary ranges vary by position. Would you like to see open positions with their salary ranges?"
  }

  if (lowerMessage.includes("apply") || lowerMessage.includes("application")) {
    return "To apply for a position:\n\n1. Upload your CV using the attachment button\n2. Browse our open positions\n3. Click on a position to see details\n4. Submit your application\n\nWould you like me to show you our current openings?"
  }

  if (lowerMessage.includes("remote") || lowerMessage.includes("work from home")) {
    return "We offer flexible work arrangements:\n\n• Fully remote positions\n• Hybrid roles (2-3 days in office)\n• Flexible hours\n\nMany of our positions support remote work. Would you like to see remote job opportunities?"
  }

  // Default response
  return "I'm here to help with your HR-related questions. I can assist you with:\n\n• Job openings and applications\n• Interview process information\n• Benefits and compensation\n• Company culture\n• CV submission\n\nWhat would you like to know more about?"
}
