import { useState } from "react"
import { Button } from "@/components/ui/button"
import { login, saveUserProfile, getDashboardPath } from "@/api/auth"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAccountType, setSelectedAccountType] = useState<"candidate" | "ta" | "hiring-manager">("candidate")

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // Use the selected account type as email to simulate different user types
      const user = await login(selectedAccountType, "password")

      // Save user profile and token to localStorage
      saveUserProfile(user)

      // Redirect to the appropriate dashboard based on account type
      const dashboardPath = getDashboardPath(user.accountType)
      window.location.href = dashboardPath
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-3xl">SH</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SmartHire</h1>
          <p className="text-gray-600 mt-2">Select an account type to login</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="space-y-2">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="accountType"
                  value="candidate"
                  checked={selectedAccountType === "candidate"}
                  onChange={(e) => setSelectedAccountType(e.target.value as "candidate")}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Candidate</div>
                  <div className="text-sm text-gray-500">candidate@example.com</div>
                </div>
              </label>

              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="accountType"
                  value="ta"
                  checked={selectedAccountType === "ta"}
                  onChange={(e) => setSelectedAccountType(e.target.value as "ta")}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Talent Acquisition (TA)</div>
                  <div className="text-sm text-gray-500">ta@example.com</div>
                </div>
              </label>

              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="accountType"
                  value="hiring-manager"
                  checked={selectedAccountType === "hiring-manager"}
                  onChange={(e) => setSelectedAccountType(e.target.value as "hiring-manager")}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Hiring Manager</div>
                  <div className="text-sm text-gray-500">manager@example.com</div>
                </div>
              </label>
            </div>
          </div>

          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
