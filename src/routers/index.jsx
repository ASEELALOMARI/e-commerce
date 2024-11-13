import { createBrowserRouter, Outlet } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import { CartProvider } from "../contexts/CartContext";
import { UsersProvider } from "../contexts/UsersContext";

import AdminProtectedRoute from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

import Products from "../components/products/Products";
import StoreLayout from "../components/layouts/StoreLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import NotAuthorized from "../components/responses/NotAuthorized";
import NotFound from "../components/responses/NotFound";
import ProductDetails from "../components/products/ProductDetails";
import ShoppingCart from "../components/cart/ShoppingCart";
import UserProfilePage from "../components/profile/UserProfilePage";
import HomePage from "../pages/HomePage";
import CategoryPage from "../components/categories/CategoryPage";
import CategoriesPage from "../pages/CategoriesPage";
import UserOrders from "../components/UserOrder/UserOrders";
import Example from "../components/form/Example";
import ManageProduct from "../components/Admin/manegeProduct/ManegeProduct";
import CreateNewProduct from "../components/Admin/manegeProduct/CreateNewProduct";
import UpdateProduct from "../components/Admin/manegeProduct/UpdateProduct";
import CreateNewCategory from "../components/Admin/manegeCategories/CreateNewCategory";
import ManageUsers from "../components/Admin/manegeUsers/ManegeUsers";
import ManegeCategories from "../components/Admin/manegeCategories/ManegeCategories";
import ManageOrders from "../components/Admin/manegeOrders/ManegeOrders";
import UpdateCategory from "../components/Admin/manegeCategories/UpdateCategory";

const PropertyWrapper = () => (
  <CartProvider>
    <AuthProvider>
      <UsersProvider>
        <ProductsProvider>
          <CategoriesProvider>
            <Outlet />
          </CategoriesProvider>
        </ProductsProvider>
      </UsersProvider>
    </AuthProvider>
  </CartProvider>
);
const Index = createBrowserRouter([
  {
    element: <PropertyWrapper />,
    errorElement: <NotFound message={'Page Not Found'}/>,
    children: [
      // Auth Route

      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "/", element: <HomePage />},

      {
        path: "/",
        element: <StoreLayout />,
        children: [
          // Public Routes
          { path: "products", element: <Products /> },
          { path: "Category", element: <CategoriesPage /> },
          { path: "productsDetails/:id", element: <ProductDetails /> },
          { path: "Category/:id", element: <CategoryPage /> },
          { path: "not-authorized", element: <NotAuthorized /> },
          { path: "from-example", element: <Example /> },

          // Protected Route - Only for logged-in users
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "Shopping-cart",
                element: <ShoppingCart />,
              },
              {
                path: "user-profile",
                element: <UserProfilePage />,
              },
              {
                path: "user-orders",
                element: <UserOrders/>,
              },
            ],
          },
        ],
      },

      // Admin Protected Route - Only for admin users
      {
        path: "admin",
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "Dashboard",
            element: <DashboardLayout />,
            children: [
              {
                path: "manage-products",
                element: <ManageProduct />,
              },
              {
                path: "newProduct",
                element: <CreateNewProduct />,
              },
              {
                path: "editProduct/:id",
                element: <UpdateProduct />,
              },
              {
                path: "manage-categories",
                element: <ManegeCategories />,
              },
              {
                path: "newCategory",
                element: <CreateNewCategory />,
              },
              {
                path: "editCategory/:id",
                element: <UpdateCategory />,
              },
              {
                path: "manage-users",
                element: <ManageUsers />,
              },
              {
                path: "manage-orders",
                element: <ManageOrders/>,
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
