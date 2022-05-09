import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { MessageContext } from "../../context/messageContext";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { setDatePicker, getDatePicker } from "../../services/datePicker";

export default function ImportUserCsv(props) {
  const [value, setValue] = useState(new Date("2022-01-01"));

 
  useEffect(() => {
    setValue(getDatePicker);
    console.log(value);
  }, []);

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 400,
          height: 250,
          marginTop: "110px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Numatytosios datos parinkimas</h2>
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
          <Grid container justifyContent="center" alignItems="center" xs={12}>
            <LocalizationProvider
              sx={{ width: 100 }}
              dateAdapter={AdapterDateFns}
            >
              <DatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setDatePicker(newValue);
                  console.log(getDatePicker);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
