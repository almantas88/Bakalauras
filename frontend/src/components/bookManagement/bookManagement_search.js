import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BookManagementContext } from "../../context/bookManagementContext";
import TableList from "./bookManagement_table";
import CircularProgress from "@mui/material/CircularProgress";

export default function Search(props) {
  const booksManagementContext = useContext(BookManagementContext);

  const [allRowsForShowing, setAllRowsForShowing] = useState(props.firstList);

  const [searchTextBookId, setSearchTextBookId] = useState("");
  const [searchTextTitle, setSearchTextTitle] = useState("");
  const [searchTextAuthor, setSearchTextAuthor] = useState("");

  const childRef = useRef();

  const handleSearchButton = () => {
    var filteredRows = props.firstList;

    filteredRows = filteredRows.filter((row) => {
      return row.bookID.toLowerCase().includes(searchTextTitle.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.author.toLowerCase().includes(searchTextAuthor.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.title.toLowerCase().includes(searchTextBookId.toLowerCase());
    });

    console.log(filteredRows);
    setAllRowsForShowing(filteredRows);
    childRef.current.setToFirstPage();
  };

  const handleClearButton = () => {
    setSearchTextBookId("");
    setSearchTextAuthor("");
    setSearchTextTitle("");
    setAllRowsForShowing(props.firstList);
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

  const handleSelectOtherUser = () => {
    props.setAction("");
    booksManagementContext.setCurrentUser({});
    booksManagementContext.setSelectedBooks([]);
    booksManagementContext.setCurrentUser({});
    booksManagementContext.setCurrentUserBooks([]);
  };

  // const fetchUserBooks = async () => {
  //   try {
  //     const { data } = await retrieveCurrentUserBooks(booksManagementContext.currentUser.cardID);
  //     booksManagementContext.setCurrentUserBooks(data.user.books);
  //     booksManagementContext.filterBooks(data.user.books);
  //     console.log("currentUserBooks:", booksManagementContext.currentUserBooks);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    setAllRowsForShowing(props.firstList);
  }, [props.firstList]);

  return (
    <>
      <Container sx={{ overflow: "hidden", width: "95%" }}>
        <h3>Paieška:</h3>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={3}>
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

      <Grid container spacing={2} sx={{ margin: "10px auto", width: "99%" }}>
        {/* <BooksTable
              ref={childRef}
              allRowsForShowing={booksCartContext.currentUserBookList}
              handleShowUserInfo={props.handleChange}
              isLoading={props.isLoading}
            /> */}
        <Grid item xs={12} md={12} lg={6}>
          <h3>{props.firstListHeading}</h3>
          {props.loading ? (
           <CircularProgress sx={{ display: "flex", margin: "130px auto" }} />
          ) : (
            <TableList
              ref={childRef}
              allRowsForShowing={allRowsForShowing}
              button={"Pridėti"}
              handleBookAction={booksManagementContext.handleAddBook}
            ></TableList>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <h3>{props.secondListHeading}</h3>
          <TableList
            ref={childRef}
            allRowsForShowing={props.secondList}
            button={"Pašalinti"}
            handleBookAction={booksManagementContext.handleDeleteBook}
          ></TableList>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ margin: "10px auto", width: "97%" }}>
        <Grid
          xs={6}
          sx={{ margin: "20px 0px" }}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            size="large"
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={() => {
              handleSelectOtherUser();
            }}
          >
            Pasirinkti kitą vartotoją
          </Button>
        </Grid>
        <Grid
          xs={6}
          sx={{ margin: "20px 0px" }}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            endIcon={<SendIcon />}
            size="large"
            variant="contained"
            onClick={() => {
              props.submit();
            }}
          >
            Atnaujinti vartotojo knygas
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
