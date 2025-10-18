import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface SuccessPageProps {
  appliedJobsCount: number
  onBackToDashboard: () => void
}

export default function SuccessPage({ appliedJobsCount, onBackToDashboard }: SuccessPageProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Application Submitted Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle2 className="w-20 h-20 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
            <p className="text-gray-600 text-lg">
              You have successfully applied to <span className="font-semibold text-green-600">{appliedJobsCount}</span>{" "}
              job
              {appliedJobsCount !== 1 ? "s" : ""}.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Our recruitment team will review your application and get back to you within 3-5 business days. You'll
              receive an email notification with the next steps.
            </p>
          </div>

          <Button onClick={onBackToDashboard} size="lg" className="w-full">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
