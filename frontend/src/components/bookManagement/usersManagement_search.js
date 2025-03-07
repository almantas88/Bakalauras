import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./usersManagement_table";
import { UsersContext } from "../../context/usersContext";
import { GradesContext } from "../../context/gradesContext";
import MenuItem from "@mui/material/MenuItem";




export default function UsersSearch(props) {
  const usersContext =
    useContext(UsersContext);

    const gradesContext =
    useContext(GradesContext);

  const [allRowsForShowing, setAllRowsForShowing] = useState(usersContext.allUserslist);

  const [searchTextFirstName, setSearchTextFirstName] = useState("");
  const [searchTextCardId, setSearchTextCardId] = useState("");
  const [searchTextLastName, setSearchTextLastName] = useState("");
  const [grade, setGrade] = useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const childRef = useRef();

  const handleSearchButton = () => {
    var filteredRows = usersContext.allUserslist;

    filteredRows = filteredRows.filter((row) => {
      return row.cardID.toLowerCase().includes(searchTextCardId.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.lastName
        .toLowerCase()
        .includes(searchTextLastName.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(searchTextFirstName.toLowerCase());
    });

    filteredRows = filteredRows.filter((row) => {
      return row.grade
        .toLowerCase()
        .includes(grade.toLowerCase());
    });
    setAllRowsForShowing(filteredRows);
    childRef.current.setToFirstPage();
  };

  const handleClearButton = () => {
    setSearchTextFirstName("");
    setSearchTextLastName("");
    setSearchTextCardId("");
    setGrade('');
    setAllRowsForShowing(usersContext.allUserslist);
    childRef.current.setToFirstPage();
  };

  const handleChangeFirstName = (text) => {
    setSearchTextFirstName(text);
  };

  const handleChangeLastName = (text) => {
    setSearchTextLastName(text);
  };

  const handleChangeCardId = (text) => {
    setSearchTextCardId(text);
  };

  useEffect(() => {
    setAllRowsForShowing(usersContext.allUserslist);
  }, [usersContext.allUserslist]);

  useEffect(() => {
    gradesContext.getAllGrades();
  }, []);

  return (
    <>
      <Container sx={{ overflow: "hidden", width: "95%" }}>
        <h3>Paieška:</h3>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              value={searchTextCardId}
              onChange={(event) => {
                handleChangeCardId(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Kortelės ID"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              value={searchTextFirstName}
              onChange={(event) => {
                handleChangeFirstName(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Vardas"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              value={searchTextLastName}
              onChange={(event) => {
                handleChangeLastName(event.target.value);
              }}
              onKeyPress={e => e.key === 'Enter' && handleSearchButton()}
              label="Pavardė"
              variant="outlined"
              autoComplete="disabled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
            fullWidth
            size="small"
              id="outlined-select-currency"
              select
              inputProps={{MenuProps: {disableScrollLock: true}}}
              label="Klasė"
              value={grade}
              onChange={handleChange}
            >
              {gradesContext.gradesList.map((option) => (
                <MenuItem key={option.grade} value={option.grade}>
                  {option.grade}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="flex-end" sx ={{marginTop: 0.5}}>
          <Grid alignItems={'right'} item xs={12} md={3}>
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

      <UsersTable
        ref={childRef}
        allRowsForShowing={allRowsForShowing}
        handleShowUserInfo={props.handleChange}
        isLoading={props.isLoading}
        setAction = {props.setAction}
      />
    </>
  );
}
