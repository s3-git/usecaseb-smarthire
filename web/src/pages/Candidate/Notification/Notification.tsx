import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Notification, NotificationFilters as FilterType } from "./types"
import { fetchNotifications, removeNotification, markNotificationAsRead } from "./mockData"
import NotificationFilters from "./components/NotificationFilters"
import NotificationList from "./components/NotificationList"
import Pagination from "./components/Pagination"

const ITEMS_PER_PAGE = 5

export default function NotificationPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    type: "All"
  })
  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      const data = await fetchNotifications()
      setNotifications(data)
    } catch (error) {
      console.error("Failed to load notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setRemovingId(id)
    try {
      await removeNotification(id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (error) {
      console.error("Failed to remove notification:", error)
    } finally {
      setRemovingId(null)
    }
  }

  const handleNotificationClick = async (id: string) => {
    // Find the notification
    const notification = notifications.find((n) => n.id === id)

    // If notification is unread, mark it as read
    if (notification && !notification.isRead) {
      try {
        await markNotificationAsRead(id)
        // Update local state
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
      } catch (error) {
        console.error("Failed to mark notification as read:", error)
      }
    }

    // Navigate to detail page
    navigate(`/notifications/${id}`)
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      filters.search === "" ||
      notification.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      notification.content.toLowerCase().includes(filters.search.toLowerCase()) ||
      notification.jobTitle?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType = filters.type === "All" || notification.type === filters.type

    return matchesSearch && matchesType
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the list when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
            <div className="text-sm text-gray-600">
              Total: <span className="font-semibold">{filteredNotifications.length}</span> notification
              {filteredNotifications.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <NotificationFilters filters={filters} onFiltersChange={setFilters} />

          {/* Notification List */}
          <NotificationList
            notifications={paginatedNotifications}
            isLoading={isLoading}
            removingId={removingId}
            onNotificationClick={handleNotificationClick}
            onRemove={handleRemove}
          />

          {/* Pagination */}
          {!isLoading && filteredNotifications.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredNotifications.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
