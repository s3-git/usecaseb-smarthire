import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import Header from "@/components/Header/Header"
import FloatingChatButton from "@/components/FloatingChat/FloatingChatButton"
import { onNotificationReceived, onNotificationClicked, setUserExternalId } from "@/lib/onesignal"
import { getCurrentUser } from "@/api/auth"

export default function Layout() {
  useEffect(() => {
    // Set up OneSignal user ID based on logged-in user
    const user = getCurrentUser()
    if (user) {
      setUserExternalId(user.id).catch((error) => {
        console.error("Failed to set OneSignal user ID:", error)
      })
    }

    // Listen for notifications received while app is open
    onNotificationReceived((notification) => {
      console.log("Notification received in foreground:", notification)

      // You can show a toast notification or update a notification counter here
      // For now, we'll just log it and dispatch a custom event
      window.dispatchEvent(
        new CustomEvent("new-notification", {
          detail: notification
        })
      )
    })

    // Listen for notification clicks
    onNotificationClicked((notification) => {
      console.log("Notification clicked:", notification)

      // Navigate to notifications page or specific notification detail
      if (notification.url) {
        window.location.href = notification.url
      } else {
        window.location.href = "/notifications"
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <FloatingChatButton />
    </div>
  )
}
