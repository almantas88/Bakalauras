import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { BooksContext } from "../../context/booksContext";
import BooksTable from "./booksTable";


export default function BookSearch(props) {
  const booksContext = useContext(BooksContext);

  const [allRowsForShowing, setAllRowsForShowing] = useState(
    props.booksList
  );

  const [searchTextBookId, setSearchTextBookId] = useState("");
  const [searchTextTitle, setSearchTextTitle] = useState("");
  const [searchTextAuthor, setSearchTextAuthor] = useState("");

  const childRef = useRef();

  const handleSearchButton = () => {
    var filteredRows = booksContext.allBooksList;

    filteredRows = filteredRows.filter((row) => {
      return row.bookID.toLowerCase().includes(searchTextTitle.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.author
        .toLowerCase()
        .includes(searchTextAuthor.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.title
        .toLowerCase()
        .includes(searchTextBookId.toLowerCase());
    });


    console.log(filteredRows);
    setAllRowsForShowing(filteredRows);
    childRef.current.setToFirstPage();
  };

  const handleClearButton = () => {
    setSearchTextBookId("");
    setSearchTextAuthor("");
    setSearchTextTitle("");
    setAllRowsForShowing(booksContext.allBooksList);
    childRef.current.setToFirstPage();
  };

  const handleChangeBookID = (text) => {
    setSearchTextBookId(text);
  };

  const handleChangeAuthor = (text) => {
    setSearchTextAuthor(text);
  };

  const handleChangeTitle = (text) => {
    setSearchTextTitle(text);
  };

  useEffect(() => {
    booksContext.setAllBooksList(booksContext.allBooksList);
    setAllRowsForShowing(booksContext.allBooksList);
  }, [booksContext.allBooksList]);

  return (
    <>
      <Container sx={{ overflow: "hidden", width: "95%" }}>
        <h3>Paieška:</h3>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              size="small"
              value={searchTextTitle}
              onChange={(event) => {
                handleChangeTitle(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Knygos ID"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              fullWidth
              size="small"
              value={searchTextBookId}
              onChange={(event) => {
                handleChangeBookID(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Pavadinimas"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              value={searchTextAuthor}
              onChange={(event) => {
                handleChangeAuthor(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Autorius"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          {/* <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              label="Klasė"
              value={grade}
              onChange={handleChange}
            >
              {grades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}
        </Grid>
        <Grid
          container
          spacing={1}
          justifyContent="flex-end"
          sx={{ marginTop: 0.5 }}
        >
          <Grid alignItems={"right"} item xs={12} md={3}>
            <Button
              sx={{
                height: "100%",
              }}
              fullWidth
              autoComplete="disabled"
              variant="contained"
              size="medium"
              startIcon={<SearchIcon />}
              onClick={() => {
                handleSearchButton();
              }}
            >
              Ieškoti
            </Button>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              sx={{
                height: "100%",
              }}
              variant="contained"
              size="medium"
              fullWidth
              startIcon={<DeleteOutlineIcon />}
              onClick={() => {
                handleClearButton();
              }}
            >
              Išvalyti
            </Button>
          </Grid>
        </Grid>
      </Container>

      <BooksTable
        ref={childRef}
        allRows={booksContext.allBooksList}
        allRowsForShowing={allRowsForShowing}
        handleShowUserInfo={props.handleChange}
        isLoading={props.isLoading}
      />
    </>
  );
}
