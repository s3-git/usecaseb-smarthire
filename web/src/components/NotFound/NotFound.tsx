import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">404 - Page Not Found</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate("/")} className="w-full">
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
