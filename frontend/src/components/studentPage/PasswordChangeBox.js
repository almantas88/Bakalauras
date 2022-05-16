import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postPasswordReset } from "../../services/studentsBooksServices"
import MenuItem from "@mui/material/MenuItem";
import { MessageContext } from "../../context/messageContext";

export default function PasswordChange(props) {

  const messageContext = useContext(MessageContext);

  const [values, setValues] = useState({
    newPassword: "",
    newPasswordRepeat: "",
    oldPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  console.log(values);

  const handleSubmit = async () => {

    try {
      const { data } = await postPasswordReset(values);
      messageContext.handleMessageShow(
        "Slaptažodis atnaujintas!",
        "success"
      );
        props.handleChange();
    } catch (error) {
      console.log(error.response.data);
      messageContext.handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 500,
          height: 350,
          marginTop: "110px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Slaptažodžio keitimas</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon
              sx={{
                fontSize: 40,
                color: "#252525",
                padding: 1,
                "&:hover": {
                  color: "#69717d",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="newPassword"
              size="small"
              id="outlined-basic"
              label="Naujas slaptažodis"
              variant="outlined"
              fullWidth
              type="password"
              value={values.newPassword}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="newPasswordRepeat"
              size="small"
              id="outlined-basic"
              label="Pakartotas naujas slaptažodis"
              variant="outlined"
              fullWidth
              type="password"
              value={values.newPasswordRepeat}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="oldPassword"
              size="small"
              id="outlined-basic"
              label="Senas slaptažodis"
              variant="outlined"
              fullWidth
              type="password"
              value={values.oldPassword}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid align="center" item xs={12}>
            {values.newPassword.length >= 5 &&
            values.newPassword === values.newPasswordRepeat &&
            values.oldPassword.length >= 5 ? (
              <Button variant="contained" onClick={handleSubmit}>Atnaujinti</Button>
            ) : (
              <Button disabled variant="contained">
                Atnaujinti
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
