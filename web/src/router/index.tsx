import { createBrowserRouter } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
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
        children: [{ path: "/", element: <Dashboard /> }]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
])
