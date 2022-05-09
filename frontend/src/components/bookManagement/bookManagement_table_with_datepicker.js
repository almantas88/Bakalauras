import React, { useState, memo, forwardRef, useImperativeHandle } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import DatePicker from "./datePicker";


const columns = [
  {
    id: "bookID",
    label: "Knygos ID",
    width: 50,
    minWidth: 50,
  },
  { id: "title", label: "Pavadinimas", width: 150, minWidth: 150 },
  { id: "author", label: "Autorius", width: 150, minWidth: 150 },
  { id: "returnDate", label: "Gražinimo data", width: 150, minWidth: 150 },
  {
    id: "actions",
    label: "Veiksmai",
    width: 100,
    minWidth: 100,
    align: "right",
  },
];

const TableList = forwardRef((props, ref) => {
  // const [showBookInfo, setshowBookInfo] = useState(false);
  // const [bookInfo, setBookInfo] = useState({
  //   bookID: "",
  //   title: "",
  //   author: "",
  // });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const [value, onChange] = useState(new Date());

  // const handleShowBookInfo = (row) => {
  //   setBookInfo({
  //     bookID: row.bookID,
  //     title: row.title,
  //     author: row.author,
  //   });
  //   showBookInfo ? setshowBookInfo(false) : setshowBookInfo(true);
  // };

  useImperativeHandle(ref, () => ({
    setToFirstPage,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const setToFirstPage = () => {
    setPage(0);
  };

  return (
    <>
      {props.isLoading ? (
        <CircularProgress sx={{ display: "flex", margin: "100px auto" }} />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", margin: "0px auto" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.allRowsForShowing
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.cardID}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "actions" ? (
                                <>
                                  <Button
                                    onClick={
                                      () =>
                                        //Padaryti cia pridejima knygos
                                        props.handleBookAction(row)
                                      //booksCartContext.handleAddBooksCartContext(row)
                                    }
                                  >
                                    {props.button}
                                  </Button>
                                </>
                              ) : column.id === "returnDate" ? (
                                <DatePicker id={row.bookID}/> 
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.allRowsForShowing.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        
      )}
    </>
  );
});

export default memo(TableList);
