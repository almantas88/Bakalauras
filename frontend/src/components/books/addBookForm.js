import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createNewBook } from "../../services/bookServices";
import { MessageContext } from "../../context/messageContext";

export default function AddBookForm(props) {
  const [
    error,
    setError,
    showError,
    setShowError,
    severity,
    setSeverity,
    closeError,
  ] = useContext(MessageContext);

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

  const handleSubmit = async () => {
    try {
      const { data } = await createNewBook(values);
      setSeverity("success");
      setError("Naujas knyga sukurta!");
      setShowError(true);
      try {
        props.setBooksList([
          {
            bookID: values.bookID,
            title: values.title,
            author: values.author,
            description: values.description,
          },
          ...props.booksList,
        ]);
      } catch (error) {
        setSeverity("error");
        setError("Ups... Kažkas nutiko negerai...");
        setShowError(true);
      }
    } catch (error) {
      setSeverity("error");
      setError(error.response.data.msg);
      setShowError(true);
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
            <h2>Pridėti knygą</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <h3>Knygos duomenys</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="bookID"
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
              Pridėti
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
