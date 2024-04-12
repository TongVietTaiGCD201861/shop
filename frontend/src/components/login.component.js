import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { User } from "../apiServices";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import backgroundImage from '../image/home/OIP.jpg';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    User.login({
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        dispatch(login(res.data));
        navigation("/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    User.loginGoogle(credentialResponse.credential)
      .then((res) => {
        dispatch(login(res.data));
        navigation("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGoogleLoginFailure = () => {
    console.error("Google login failure:");
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        component="main"
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ background: 'rgb(179 155 135 / 49%)' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <GoogleLogin
                  onSuccess={onGoogleLoginSuccess}
                  onError={onGoogleLoginFailure}
                />
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
