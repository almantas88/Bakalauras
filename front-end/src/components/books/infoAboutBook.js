import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function InfoBook(props) {
  return (
    <div className="addUserContainer">
      <Container
        className="addUserForm"
        sx={{
          marginTop: 10,
          width: 500,
          height: 600,
          backgroundColor: "#F5F5F5",
          borderRadius: 2
        }}
      >
        <Grid
          container
          spacing={2}
          justify="center"
        >
          <Grid item xs={10}>
            <h2>Informaciją apie knygą</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <h3>{props.bookInfo.bookID} - {props.bookInfo.title} {props.bookInfo.author}</h3>
          </Grid>
          <Grid align="center" item xs={12}>
            <Button variant="contained">Pridėti</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
