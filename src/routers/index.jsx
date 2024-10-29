import { createBrowserRouter, Outlet } from "react-router-dom";
import Products from "../components/products/Products";

const PropertyWrapper = () => <Outlet />;

const Index = createBrowserRouter([
  {
    element: <PropertyWrapper />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

export default Index;
