import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import CandidateDashboard from "@/pages/Candidate/Dashboard/Dashboard"
import NotificationPage from "@/pages/Candidate/Notification/Notification"
import NotificationDetail from "@/pages/Candidate/Notification/NotificationDetail"
import NotFound from "@/components/NotFound/NotFound"

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <Login /> }]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/candidate/dashboard", element: <CandidateDashboard /> },
          { path: "/notifications", element: <NotificationPage /> },
          { path: "/notifications/:id", element: <NotificationDetail /> }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
])
