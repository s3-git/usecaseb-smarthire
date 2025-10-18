import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { router } from "@/router"
import { RouterProvider } from "react-router-dom"
import { initializeOneSignal } from "@/lib/onesignal"

// Initialize OneSignal when app starts
export function App() {
  useEffect(() => {
    // Initialize OneSignal
    initializeOneSignal().catch((error) => {
      console.error("Failed to initialize OneSignal:", error)
    })
  }, [])

  return <RouterProvider router={router} />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
