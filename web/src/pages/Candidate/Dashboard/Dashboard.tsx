import { useState } from "react"
import type { ParsedProfile, JobRecommendation } from "./types"
import ProgressBar from "./components/ProgressBar"
import Step1UploadCV from "./components/Step1UploadCV"
import Step2PreviewProfile from "./components/Step2PreviewProfile"
import Step3RecommendedJobs from "./components/Step3RecommendedJobs"
import SuccessPage from "./components/SuccessPage"

export default function CandidateDashboard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [profile, setProfile] = useState<ParsedProfile>({
    fullName: "",
    age: "",
    location: "",
    email: "",
    phone: "",
    positionTitle: "",
    skillExperience: "",
    workExperience: "",
    achievement: ""
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [jobs, setJobs] = useState<JobRecommendation[]>([])
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set())
  const [isApplying, setIsApplying] = useState(false)
  const [appliedJobsCount, setAppliedJobsCount] = useState(0)

  // Mock API: Upload CV and parse
  const handleFileUpload = async (file: File) => {
    console.log("Uploading file:", file)
    setIsUploading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock parsed data
    const mockProfile: ParsedProfile = {
      fullName: "John Doe",
      age: "28",
      location: "San Francisco, CA",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      positionTitle: "Senior Software Engineer",
      skillExperience: "React, TypeScript, Node.js, Python, AWS, Docker, PostgreSQL",
      workExperience:
        "5 years as Full Stack Developer at Tech Corp (2019-2024), 3 years as Software Engineer at StartupXYZ (2016-2019)",
      achievement:
        "Led migration of monolithic app to microservices, reducing deployment time by 60%. Published 3 technical articles with 50K+ views."
    }

    setProfile(mockProfile)
    setIsUploading(false)
    setCurrentStep(2)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file")
      return
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert("File size must be less than 5MB")
      return
    }

    setUploadedFile(file)
    handleFileUpload(file)
  }

  // Mock API: Submit profile and get recommendations
  const handleProceedToJobs = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock job recommendations
    const mockJobs: JobRecommendation[] = [
      {
        id: "1",
        positionTitle: "Senior Full Stack Engineer",
        location: "San Francisco, CA",
        matchingPercent: 95
      },
      {
        id: "2",
        positionTitle: "Lead Software Engineer",
        location: "Remote",
        matchingPercent: 88
      },
      {
        id: "3",
        positionTitle: "Principal Engineer",
        location: "New York, NY",
        matchingPercent: 82
      },
      {
        id: "4",
        positionTitle: "Engineering Manager",
        location: "Austin, TX",
        matchingPercent: 75
      },
      {
        id: "5",
        positionTitle: "Senior Backend Engineer",
        location: "Seattle, WA",
        matchingPercent: 72
      }
    ]

    setJobs(mockJobs)
    setIsProcessing(false)
    setCurrentStep(3)
  }

  const handleJobSelection = (jobId: string) => {
    const newSelected = new Set(selectedJobs)
    if (newSelected.has(jobId)) {
      newSelected.delete(jobId)
    } else {
      newSelected.add(jobId)
    }
    setSelectedJobs(newSelected)
  }

  // Mock API: Apply to selected jobs
  const handleApplyToJobs = async () => {
    if (selectedJobs.size === 0) {
      alert("Please select at least one job to apply")
      return
    }

    setIsApplying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store the count and move to success page
    setAppliedJobsCount(selectedJobs.size)
    setIsApplying(false)
    setCurrentStep(4)
  }

  const handleBackToDashboard = () => {
    // Reset all state and go back to step 1
    setCurrentStep(1)
    setUploadedFile(null)
    setProfile({
      fullName: "",
      age: "",
      location: "",
      email: "",
      phone: "",
      positionTitle: "",
      skillExperience: "",
      workExperience: "",
      achievement: ""
    })
    setJobs([])
    setSelectedJobs(new Set())
    setAppliedJobsCount(0)
  }

  const handleProfileChange = (field: keyof ParsedProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">AI-Powered Online Application</h1>

      {/* Progress Steps */}
      <ProgressBar currentStep={currentStep} />

      {/* Step 1: Upload CV */}
      {currentStep === 1 && (
        <Step1UploadCV isUploading={isUploading} uploadedFile={uploadedFile} onFileChange={handleFileChange} />
      )}

      {/* Step 2: Preview Profile */}
      {currentStep === 2 && (
        <Step2PreviewProfile
          profile={profile}
          isProcessing={isProcessing}
          onProfileChange={handleProfileChange}
          onProceed={handleProceedToJobs}
        />
      )}

      {/* Step 3: Recommended Jobs */}
      {currentStep === 3 && (
        <Step3RecommendedJobs
          jobs={jobs}
          selectedJobs={selectedJobs}
          isApplying={isApplying}
          onJobSelection={handleJobSelection}
          onApply={handleApplyToJobs}
        />
      )}

      {/* Step 4: Success Page */}
      {currentStep === 4 && (
        <SuccessPage appliedJobsCount={appliedJobsCount} onBackToDashboard={handleBackToDashboard} />
      )}
    </div>
  )
}
