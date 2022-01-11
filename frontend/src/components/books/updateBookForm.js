import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MessageContext } from "../../context/messageContext";
import { getOneBook, updateOneBook } from "../../services/bookServices";
import CircularProgress from "@mui/material/CircularProgress";
import { BooksContext } from "../../context/booksContext";

export default function UpdateBookForm(props) {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

    const booksContext = useContext(BooksContext);

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    bookID: "",
    title: "",
    author: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchBook = async (bookID) => {
    try {
      const { data } = await getOneBook({ bookID });
      setValues({
        bookID: data.book.bookID,
        title: data.book.title,
        author: data.book.author,
        description: data.book.description,
      });
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    try {
      fetchBook(props.bookInfo.bookID);
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
    setIsLoading(false);
  }, []);

  // darbai ateičiai :
  // reikia padaryti update route back ende ir čia išsiuntimą į jį
  const handleSubmit = async () => {
    try {
      const { data } = await updateOneBook(values);
      booksContext.handleUpdateBookContext(values.bookID, values);
      handleMessageShow("Knyga atnaujinta!", "success");
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
          <CircularProgress
            sx={{ display: "flex", margin: "auto", padding: 15 }}
          />
        ) : (
          <Grid container spacing={2} justify="center">
            <Grid item xs={10}>
              <h2>Atnaujinti knyga</h2>
            </Grid>
            <Grid item xs={2} onClick={props.handleChange}>
              <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="bookID"
                disabled
                value={values.bookID}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Knygos id"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                value={values.title}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Knygos pavadinimas"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="author"
                value={values.author}
                onChange={handleInputChange}
                fullWidth
                required
                autoComplete="disabled"
                label="Autorius"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <h3>Knygos aprašymas</h3>
            </Grid>
            <Grid item xs={12}>
              <TextField
                minRows={4}
                multiline
                maxRows={4}
                name="description"
                value={values.description}
                onChange={handleInputChange}
                fullWidth
                label="Aprašymas"
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
