import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Layout() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/">Dashboard</Link>
        <Button
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }}
        >
          Logout
        </Button>
      </nav>
      <Outlet />
    </div>
  )
}
