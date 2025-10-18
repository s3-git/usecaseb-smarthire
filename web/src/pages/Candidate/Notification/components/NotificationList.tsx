import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Notification, NotificationType } from "../types"

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
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }
}

interface NotificationListProps {
  notifications: Notification[]
  isLoading: boolean
  removingId: string | null
  onNotificationClick: (id: string) => void
  onRemove: (id: string, event: React.MouseEvent) => void
}

export default function NotificationList({
  notifications,
  isLoading,
  removingId,
  onNotificationClick,
  onRemove
}: NotificationListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading notifications...</p>
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No notifications found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => onNotificationClick(notification.id)}
          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
            notification.isRead ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Type Badge */}
            <div
              className={`w-36 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap text-center flex-shrink-0 ${getNotificationColor(
                notification.type
              )}`}
            >
              {notification.type}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{notification.title}</h3>
                {!notification.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>}
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.content}</p>
              {notification.jobTitle && (
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Job:</strong> {notification.jobTitle}
                </p>
              )}
            </div>

            {/* Date and Remove */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDateTime(notification.dateTime)}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={(e) => onRemove(notification.id, e)}
                disabled={removingId === notification.id}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                aria-label="Remove notification"
              >
                {removingId === notification.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-red-600"></div>
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
