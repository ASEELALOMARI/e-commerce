import { createBrowserRouter, Outlet } from "react-router-dom";
import Products from "../components/products/Products";
import StoreLayout from "../components/layouts/StoreLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";


const PropertyWrapper = () => <Outlet />;

const Index = createBrowserRouter([
  {
    element: <PropertyWrapper />,
    children: [
      {
        path: "/",
        element: <StoreLayout/>,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "admin",
        element: <DashboardLayout/>,
      },
    ],
  },
]);

export default Index;
