import { Button } from "@/components/ui/button"

export default function Login() {
  const handleLogin = () => {
    localStorage.setItem("token", "mock-token")
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}
