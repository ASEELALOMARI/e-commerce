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
import Example from "../components/form/example";
import ManageProduct from "../components/admin/manegeProduct/ManegeProduct";
import CreateNewProduct from "../components/admin/manegeProduct/CreateNewProduct";
import UpdateProduct from "../components/admin/manegeProduct/UpdateProduct";
import ManegeCategories from "../components/admin/manegeCategories/ManegeCategories";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import CreateNewCategory from "../components/admin/manegeCategories/CreateNewCategory";
import UpdateCategory from "../components/admin/manegeCategories/UpdateCategory";



const PropertyWrapper = () => (
  <AuthProvider>
    <ProductsProvider>
      <CategoriesProvider>
      <Outlet />
      </CategoriesProvider>
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
        path:"admin",
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "Dashboard",
            element: <DashboardLayout />,
            children: [
              {
                path: "manage-products",
                element: <ManageProduct/>,
              },
              {
                path: "newProduct",
                element: <CreateNewProduct/>,
              },
              {
                path: "editProduct/:id",
                element: <UpdateProduct/>,
              },
              {
                path: "manage-categories",
                element: <ManegeCategories/>,
              },
              {
                path: "newCategory",
                element: <CreateNewCategory/>,
              },
              {
                path: "editCategory/:id",
                element: <UpdateCategory/>
              },
              {
                path: "manage-users",
                element: <div>mange users</div>,
              },
              {
                path: "manage-orders",
                element: <div>manage orders</div>,
              },
              {
                path: "settings",
                element: <div>settings</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default Index;
