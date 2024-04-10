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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "product", element: <Home /> },
      { path: "product/cart", element: <Cart /> },
      { path: "product/:id", element: <ProductDetail /> },
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
