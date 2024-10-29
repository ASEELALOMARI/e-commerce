import { createBrowserRouter, Outlet } from "react-router-dom";
import Products from "../components/products/Products";
import StoreLayout from "../components/layouts/StoreLayout";


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
    ],
  },
]);

export default Index;
