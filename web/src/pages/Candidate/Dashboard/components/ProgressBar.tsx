import { CheckCircle2 } from "lucide-react"

interface ProgressBarProps {
  currentStep: number
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { step: 1, label: "Upload CV" },
    { step: 2, label: "Preview Profile" },
    { step: 3, label: "Recommended Jobs" }
  ]

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((item, index) => (
          <div key={item.step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > item.step
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === item.step
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {currentStep > item.step ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{item.step}</span>
                )}
              </div>
              <span className="text-sm mt-2 font-medium text-center">{item.label}</span>
            </div>
            {index < 2 && (
              <div className={`h-1 flex-1 mx-2 -mt-6 ${currentStep > item.step ? "bg-green-500" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
