import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import type { JobRecommendation } from "../types"

interface Step3RecommendedJobsProps {
  jobs: JobRecommendation[]
  selectedJobs: Set<string>
  isApplying: boolean
  onJobSelection: (jobId: string) => void
  onApply: () => void
}

export default function Step3RecommendedJobs({
  jobs,
  selectedJobs,
  isApplying,
  onJobSelection,
  onApply
}: Step3RecommendedJobsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Recommended Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onJobSelection(job.id)}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedJobs.has(job.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedJobs.has(job.id) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedJobs.has(job.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{job.positionTitle}</h4>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{job.matchingPercent}%</div>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
              </div>
            ))}
          </div>

          {/* Apply Button */}
          <div className="mt-6 pt-6 border-t">
            <Button onClick={onApply} disabled={isApplying || selectedJobs.size === 0} size="lg" className="w-full">
              {isApplying
                ? "Applying..."
                : `Apply to Selected Job${selectedJobs.size !== 1 ? "s" : ""} (${selectedJobs.size})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
