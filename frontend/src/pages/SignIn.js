import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageLogo from "../public/images/be-fono-logo.png";
import { login } from "../services/authServices";

import { MessageContext } from "../context/messageContext";

const theme = createTheme();

export default function SignInSide() {
  const messageContext =
    useContext(MessageContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    doSubmit(data.get("email"), data.get("password"));
  };

  const doSubmit = async (email, password) => {
    try {
      //await login({ email, password });
      const { data } = await login({ email, password });
      console.log(data);
      messageContext.handleMessageShow("Pavyko prisijungti", "success");
      setTimeout(() => {
        messageContext.closeError();
        if (data.user.role === "ADMIN") {
          window.location = "/users";
        } else if (data.user.role === "STUDENT") {
          window.location = "/student";
        }
      }, 500);
    } catch (error) {
      messageContext.handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImageLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Prisijungti
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
                label="El. Paštas"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Slaptažodis"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prisijungti
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset" variant="body2">
                    Pamiršote slaptažodį?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/newuser" variant="body2">
                    {"Neturi paskyros?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
