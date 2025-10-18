import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Notification, NotificationType } from "./types"
import { fetchNotifications, markNotificationAsRead } from "./mockData"

const getNotificationColor = (type: NotificationType): string => {
  const colors: Record<NotificationType, string> = {
    Applied: "bg-blue-100 text-blue-800 border-blue-200",
    Shortlisted: "bg-green-100 text-green-800 border-green-200",
    "Interview Scheduled": "bg-purple-100 text-purple-800 border-purple-200",
    Interviewed: "bg-indigo-100 text-indigo-800 border-indigo-200",
    "Interview Cancelled": "bg-orange-100 text-orange-800 border-orange-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
    Offered: "bg-yellow-100 text-yellow-800 border-yellow-200"
  }
  return colors[type]
}

const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime)
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
}

export default function NotificationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNotification()
  }, [])

  const loadNotification = async () => {
    setIsLoading(true)
    try {
      const notifications = await fetchNotifications()
      const found = notifications.find((n) => n.id === id)

      if (found) {
        setNotification(found)
        // Mark as read
        if (!found.isRead) {
          await markNotificationAsRead(found.id)
        }
      } else {
        // Notification not found
        navigate("/notifications")
      }
    } catch (error) {
      console.error("Failed to load notification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate("/notifications")
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading notification...</p>
        </div>
      </div>
    )
  }

  if (!notification) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600">Notification not found</p>
            <Button onClick={handleBack} className="mt-4">
              Back to Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Notifications
      </Button>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            {/* Type Badge */}
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getNotificationColor(
                  notification.type
                )}`}
              >
                {notification.type}
              </span>
            </div>

            {/* Title */}
            <CardTitle className="text-2xl font-bold">{notification.title}</CardTitle>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDateTime(notification.dateTime)}
              </div>
              {notification.jobTitle && (
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {notification.jobTitle}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">{notification.content}</div>
          </div>

          {/* Action Buttons (if applicable) */}
          {notification.type === "Interview Scheduled" && (
            <div className="mt-6 pt-6 border-t flex gap-3">
              <Button className="flex-1">Confirm Attendance</Button>
              <Button variant="outline" className="flex-1">
                Request Reschedule
              </Button>
            </div>
          )}

          {notification.type === "Offered" && (
            <div className="mt-6 pt-6 border-t flex gap-3">
              <Button className="flex-1">Accept Offer</Button>
              <Button variant="outline" className="flex-1">
                Decline Offer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
