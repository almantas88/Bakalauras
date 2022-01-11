import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MessageContext } from "../../context/messageContext";
import { getOneUser, updateOneUser } from "../../services/userServices";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersContext } from "../../context/usersContext";

export default function UpdateUserForm(props) {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

    const usersContext =
    useContext(UsersContext);

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cardID: "",
    grade: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchUser = async (cardID) => {
    try {
      const { data } = await getOneUser({cardID});
      setValues({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cardID: data.user.cardID,
        grade: data.user.grade,
        email: data.user.email,
        password: "",
        passwordCheck: "",
      });
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  useEffect(() => {
    console.log(window.localStorage.getItem("token"));
    setIsLoading(true);
    try {
      fetchUser(props.userInfo.cardID);
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
    setIsLoading(false);
  }, []);


  // darbai ateičiai : 
  // reikia padaryti update route back ende ir čia išsiuntimą į jį
  const handleSubmit = async () => {
    try {
      const { data } = await updateOneUser(values);    
      usersContext.handleUpdateUserContext(values.cardID, values);
      handleMessageShow("Vartotojas atnaujintas!", "success");
    } catch (error) {
      console.log(error.response.data);
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 500,
          height: 650,
          marginTop: "120px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ display: "flex", margin: "auto", padding: 15 }} />
        ) : (
          <Grid container spacing={2} justify="center">
            <Grid item xs={10}>
              <h2>Atnaujinti vartotoją</h2>
            </Grid>
            <Grid item xs={2} onClick={props.handleChange}>
              <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cardID"
                value={values.cardID}
                onChange={handleInputChange}
                fullWidth
                required
                disabled
                autoComplete="disabled"
                label="Kortelės id"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Vardas"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Pavardė"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="grade"
                value={values.grade}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Klasė"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <h3>Vaiko prisijungimo duomenys</h3>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                value={values.email}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="El. paštas"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="password"
                value={values.password}
                onChange={handleInputChange}
                fullWidth
                required
                type="password"
                autoComplete="disabled"
                label="Slaptažodis"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="passwordCheck"
                value={values.passwordCheck}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                type="password"
                label="Pakartotas slaptažodis"
                variant="outlined"
              />
            </Grid>
            <Grid align="center" item xs={12}>
              <Button
                onClick={handleSubmit}
                size="large"
                variant="contained"
                sx={{ padding: 1, width: "50%", margin: "20px 0" }}
              >
                Redaguoti
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
