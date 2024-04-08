import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/nav.component";
import Index from "./components/index.component";
import Home from "./view/home"
import ProductDetail from "./view/productDetail"
import { Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const location = useLocation();
  return (
    <>
      <GoogleOAuthProvider clientId="585540999470-rqmh6ang47qma66879fkhsgppi12q1ed.apps.googleusercontent.com">
        <Navigation />
        {/* {location.pathname === "/" ? (
          <Container sx={{ mt: 4, height: "100%" }}>
            <Home />
          </Container>
        ) : ( */}
          <Container sx={{ mt: 4, height: "100%" }}>
            <Outlet />
          </Container>
        {/* )} */}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
