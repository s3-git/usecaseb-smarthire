export type NotificationType =
  | "Applied"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interviewed"
  | "Interview Cancelled"
  | "Rejected"
  | "Offered"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  content: string
  dateTime: string
  isRead: boolean
  jobTitle?: string
}

export interface NotificationFilters {
  search: string
  type: NotificationType | "All"
}
