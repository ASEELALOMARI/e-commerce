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
import ProductDetails from "../components/products/ProductDetails";
import AuthLayout from "../components/layouts/AuthLayout";
import Example from "../components/form/example";

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
      // Auth Route

      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },

      {
        path: "/",
        element: <StoreLayout />,
        children: [
          // Public Routes

          { path: "products", element: <Products /> },
          { path: "productsDetails/:id", element: <ProductDetails /> },
          { path: "not-authorized", element: <NotAuthorized /> },
          {path: "from-example", element:  <Example/> },

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
            path: "dashboard",
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
