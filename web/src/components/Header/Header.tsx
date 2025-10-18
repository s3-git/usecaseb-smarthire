import { useState, useRef, useEffect } from "react"
import { Bell, User, LogOut, BellRing } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, getDashboardPath, logout } from "@/api/auth"
import { showNotificationPrompt, isSubscribed } from "@/lib/onesignal"

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user] = useState(() => getCurrentUser())
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Check notification permission status on mount
  useEffect(() => {
    checkNotificationPermission()
  }, [])

  const checkNotificationPermission = async () => {
    const subscribed = await isSubscribed()
    setNotificationPermissionGranted(subscribed)
  }

  const handleEnableNotifications = async () => {
    const granted = await showNotificationPrompt()
    setNotificationPermissionGranted(granted)
    if (granted) {
      console.log("Notifications enabled successfully")
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleNotificationClick = () => {
    navigate("/notifications")
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      const dashboardPath = getDashboardPath(user.accountType)
      navigate(dashboardPath)
    } else {
      navigate("/login")
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartHire</span>
            </a>
          </div>

          {/* Right side: Notification and User icons */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              {/* Notification badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                    {user?.accountType && (
                      <p className="text-xs text-gray-400 mt-1 capitalize">{user.accountType.replace("-", " ")}</p>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {!notificationPermissionGranted && (
                      <button
                        onClick={handleEnableNotifications}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <BellRing className="w-4 h-4 mr-3 text-blue-500" />
                        Enable Notifications
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
