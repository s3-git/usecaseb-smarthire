import { useState } from "react"

export function useAuth() {
  const [token] = useState(() => localStorage.getItem("token"))
  const isAuthenticated = !!token
  return { isAuthenticated }
}
