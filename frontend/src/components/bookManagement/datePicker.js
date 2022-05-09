import React, { useState, useContext, useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BookManagementContext } from "../../context/bookManagementContext";
import { setDatePicker, getDatePicker } from "../../services/datePicker";



export default function Datepicker(props) {
    const booksManagementContext = useContext(BookManagementContext);
    const [value, setValue] = useState(getDatePicker);
    console.log(value);
 
  return (
    <div>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        
        value={value}
        onChange={(newValue) => {
          setValue(newValue); booksManagementContext.handleDateChange(props.id, newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </div>
  );
}