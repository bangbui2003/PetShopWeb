import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
//
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import Page404 from "../pages/Page404";
import DogPage from "../pages/DogPage";
import DashboardAppPage from "../pages/DashboardAppPage";
import ProtectedPage from "../components/ProtectedPage";
import InvoicePage from "~/pages/InvoicePage";
import ProfilePage from "~/pages/ProfilePage";
import DogItemPage from "../pages/DogItemPage";
import VoucherPage from "~/pages/VoucherPage";
import BookingPage from "~/pages/BookingPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />
    },
    {
      path: "/dashboard",
      element:
      <ProtectedPage>
        <DashboardLayout />
      </ProtectedPage>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "dog", element: <DogPage /> },
        { path: "dog-item", element: <DogItemPage /> },
        { path: "invoice", element: <InvoicePage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "voucher", element: <VoucherPage /> },
        { path: "booking", element: <BookingPage /> }
      ]
    },
    {
      path: "login",
      element: <LoginPage />
    },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />
    }
  ]);

  return routes;
}
