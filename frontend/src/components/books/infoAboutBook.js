import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { getOneBook } from "../../services/bookServices";

export default function InfoBook(props) {

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    title: "",
    author: "",
    description: "",
    bookID: ""
  });

  useEffect(() => {
    getBookInfo();
  }, []);


  async function getBookInfo() {
    setIsLoading(true);
    try {
      const { data } = await getOneBook(props.bookInfo.bookID);
      console.log(data);
      setValues({
        title: data.book.title,
        author: data.book.author,
        description: data.book.description,
        bookID: data.book.bookID
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

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
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1,  '&:hover': {
      color: "#69717d",
    }}} />
          </Grid>
          <Grid item xs={4}>
            <p><strong>Knygos id:</strong></p>
            <p>{values.bookID}</p>
          </Grid>
          <Grid item xs={8}>
            <p><strong>Autorius:</strong></p>
            <p>{values.author}</p>
          </Grid>
          <Grid item xs={12}>
            <p><strong>Pavadinimas:</strong></p>
            <p>{values.title}</p>
          </Grid>
          <Grid item xs={12}>
            <p><strong>Aprašymas:</strong></p>
            <p>{values.description}</p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
