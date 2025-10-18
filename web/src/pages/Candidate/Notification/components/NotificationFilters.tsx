import { Search } from "lucide-react"
import type { NotificationType, NotificationFilters } from "../types"

const notificationTypes: (NotificationType | "All")[] = [
  "All",
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Interviewed",
  "Interview Cancelled",
  "Rejected",
  "Offered"
]

interface NotificationFiltersComponentProps {
  filters: NotificationFilters
  onFiltersChange: (filters: NotificationFilters) => void
}

export default function NotificationFiltersComponent({ filters, onFiltersChange }: NotificationFiltersComponentProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type Combobox */}
      <div className="md:w-64">
        <select
          value={filters.type}
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value as NotificationType | "All" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {notificationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
