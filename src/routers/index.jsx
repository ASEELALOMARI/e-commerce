import { createBrowserRouter, Outlet } from "react-router-dom";

import Products from "../components/products/Products";
import StoreLayout from "../components/layouts/StoreLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthProvider } from "../contexts/AuthContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import NotAuthorized from "../components/responses/NotAuthorized";

const PropertyWrapper = () => (
  <AuthProvider>
    <ProductsProvider>
      <Outlet />
    </ProductsProvider>
  </AuthProvider>
);
const Index = createBrowserRouter([
  {
    element: <PropertyWrapper />,
    children: [
      {
        path: "/",
        element: <StoreLayout />,
        children: [
          // Public Routes
          { path: "login", element: <LoginForm /> },
          { path: "register", element: <RegisterForm /> },
          { path: "products", element: <Products /> },
          { path: "not-authorized", element: <NotAuthorized /> },

          // Protected Route - Only for logged-in users
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "user-profile",
                element: <div>user profile</div>, // Example: replace with actual protected route component
              },
              {
                path: "order-history",
                element: <div>user order</div>,
              },
            ],
          },
        ],
      },

      // Admin Protected Route - Only for admin users
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "admin",
            element: <DashboardLayout />,
            children: [
              {
                path: "manage-products",
                element: <div>Manage Products</div>,
              },
              {
                path: "manage-users",
                element: <div>mange users</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Index;
