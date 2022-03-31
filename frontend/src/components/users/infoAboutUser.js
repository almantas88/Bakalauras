import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { retrieveCurrentUserBooks } from "../../services/booksManagement";
import UserBooksInfoTable from "./userBooksInfoTable";


export default function InfoUser(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    cardID: "",
    grade: "",
    email: "",
    books: []
  });

  useEffect(() => {
    getStudentBooks();
  }, []);

  async function getStudentBooks() {
    setIsLoading(true);
    try {
      const { data } = await retrieveCurrentUserBooks(props.userInfo.cardID);
      console.log(data);
      setValues({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cardID: data.user.cardID,
        grade: data.user.grade,
        email: data.user.email,
        books: data.user.books
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          marginTop: 10,
          width: 550,
          height: 650,
          backgroundColor: "#F5F5F5",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Informaciją apie vartotoją</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1, '&:hover': {
      color: "#69717d",
    } }} />
          </Grid>
          <Grid item xs={4}>
            <p><strong>Kortelės id:</strong></p>
            <p>{props.userInfo.cardID}</p>
          </Grid>
          <Grid item xs={4}>
            <p><strong>Vardas:</strong></p>
            <p>{props.userInfo.firstName}</p>
          </Grid>
          <Grid item xs={4}>
            <p><strong>Pavardė:</strong></p>
            <p>{props.userInfo.lastName}</p>
          </Grid>
          <Grid  item xs={8}>
            <p><strong>El. paštas:</strong></p>
            <p>{values.email}</p>
          </Grid>
          <Grid  item xs={4}>
            <p><strong>Klasė</strong></p>
            <p>{values.grade}</p>
          </Grid>
          <Grid sx={{}} align="center" item xs={12}>
            <UserBooksInfoTable rows={values.books} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
