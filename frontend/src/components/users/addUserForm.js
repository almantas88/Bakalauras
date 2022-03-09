import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createNewUser } from "../../services/userServices";
import { MessageContext } from "../../context/messageContext";
import { GradesContext } from "../../context/gradesContext";
import MenuItem from "@mui/material/MenuItem";

export default function AddUserForm(props) {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

    const gradesContext =
    useContext(GradesContext);

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

  const handleChange = (event) => {
    setValues({
      ...values,
      grade: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createNewUser(values);
      handleMessageShow("Naujas vartotojas sukurtas!", "success");

      props.setUsersList([
        {
          grade: values.grade,
          cardID: values.cardID,
          firstName: values.firstName,
          lastName: values.lastName,
          booksLength: 0
        },
        ...props.usersList,
      ]);
      console.log(data);
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
          height: 710,
          marginTop: "110px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Pridėti vartotoją</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <h3>Vaiko duomenys</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="cardID"
              value={values.cardID}
              onChange={handleInputChange}
              fullWidth
              required
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
            fullWidth
              id="outlined-select-currency"
              select
              inputProps={{MenuProps: {disableScrollLock: true}}}
              label="Klasė"
              value={values.grade}
              onChange={handleChange}
            >
              {gradesContext.gradesList.map((option) => (
                <MenuItem key={option.grade} value={option.grade}>
                  {option.grade}
                </MenuItem>
              ))}
            </TextField>
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
              Pridėti
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
