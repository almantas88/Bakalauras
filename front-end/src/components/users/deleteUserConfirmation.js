import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { deleteUser } from "../../services/userServices";
import { MessageContext } from "../../context/messageContext";
import { UsersContext } from "../../context/usersContext";

export default function DeleteUser(props) {
  const usersContext =
    useContext(UsersContext);

    const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const handleDeleteUser = async () => {
    try {
      
      const cardID = props.userInfo.cardID;
      console.log({cardID});
      const { data } = await deleteUser({cardID: props.userInfo.cardID});
      usersContext.handleDeleteUserContext(props.userInfo.cardID);
      handleMessageShow("Vartotojas buvo sėkmingai panaikintas!", "success");
      props.closeConfirmation();
    } catch (error) {
      console.log(error.response.data);
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="addUserContainer">
      <Container
        className="addUserForm"
        sx={{
          width: 500,
          height: 320,
          marginTop: "120px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <h2 className="centerHeader">
              Ar tikrai norite panaikinti šį vartotoją?
            </h2>
          </Grid>
          <Grid item xs={12}>
            <h3 className="centerHeader">
              Kortelės id - {props.userInfo.cardID}
            </h3>
            <h3 className="centerHeader">
              {props.userInfo.firstName} {props.userInfo.lastName}
            </h3>
          </Grid>
          <Grid align="right" item xs={6}>
            <Button
              size="large"
              color="error"
              variant="contained"
              onClick={handleDeleteUser}
            >
              Ištrinti
            </Button>
          </Grid>
          <Grid align="left" item xs={6}>
            <Button
              size="large"
              variant="contained"
              onClick={props.handleChange}
            >
              Atšaukti
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
