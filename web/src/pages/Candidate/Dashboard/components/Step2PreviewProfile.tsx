import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ParsedProfile } from "../types"

interface Step2PreviewProfileProps {
  profile: ParsedProfile
  isProcessing: boolean
  onProfileChange: (field: keyof ParsedProfile, value: string) => void
  onProceed: () => void
}

export default function Step2PreviewProfile({
  profile,
  isProcessing,
  onProfileChange,
  onProceed
}: Step2PreviewProfileProps) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Step 2: Preview Your Parsed Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => onProfileChange("fullName", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="text"
                  value={profile.age}
                  onChange={(e) => onProfileChange("age", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => onProfileChange("location", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => onProfileChange("email", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => onProfileChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position Title</label>
                <input
                  type="text"
                  value={profile.positionTitle}
                  onChange={(e) => onProfileChange("positionTitle", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">Skill Experience</label>
            <textarea
              value={profile.skillExperience}
              onChange={(e) => onProfileChange("skillExperience", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="block text-sm font-medium mb-2">Work Experience</label>
            <textarea
              value={profile.workExperience}
              onChange={(e) => onProfileChange("workExperience", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Achievement */}
          <div>
            <label className="block text-sm font-medium mb-2">Achievement</label>
            <textarea
              value={profile.achievement}
              onChange={(e) => onProfileChange("achievement", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button type="button" onClick={onProceed} disabled={isProcessing} size="lg">
              {isProcessing ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
