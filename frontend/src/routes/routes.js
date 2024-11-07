import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Create from "../components/create.component";
import Update from "../components/update.component";
import Login from "../components/login.component";
import Register from "../components/register.component";
import RequireAuth from "./requireAuth";
import VerifyEmail from "../components/verifyEmail.component";
import { ResetPassword } from "../components/resetPassword.component";
import { ForgotPassword } from "../components/forgotPassword.component";
import ProductDetail from "../view/productDetail";
import Home from "../view/home";
import Cart from "../view/cart";
import Purchase from "../view/purchase";
import OrderManagement from "../view/orderManagement";
import ProductManagement from "../view/productManagement";
import Profile from "../view/profile";
import Paypal from "../components/paypal";
import SearchResults from "../view/search";
import Contact from "../view/contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "reset-password/login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/forgot-password", element: <ForgotPassword /> },
      { path: "home", element: <Home /> },
      { path: "product/cart", element: <Cart /> },
      { path: "product/purchase", element: <Purchase /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "admin/order-management", element: <OrderManagement /> },
      { path: "admin/product-management", element: <ProductManagement /> },
      { path: "profile", element: <Profile /> },
      { path: "paypal", element: <Paypal /> },
      { path: "product", element: <SearchResults /> },
      { path: "contact", element: <Contact /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "create", element: <Create /> },
          { path: "update/:id", element: <Update /> },
        ],
      },
    ],
  },
]);
