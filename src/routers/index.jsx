import { createBrowserRouter, Outlet } from "react-router-dom";
import Products from "../components/products/Products";
import StoreLayout from "../components/layouts/StoreLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthProvider } from "../contexts/AuthContext";

const PropertyWrapper = () => (
  <AuthProvider>
    <Outlet />
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
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegisterForm />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
      {
        path: "admin",
        element: <DashboardLayout />,
      },
    ],
  },
]);

export default Index;
