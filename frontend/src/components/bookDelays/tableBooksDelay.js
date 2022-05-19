import React, {
    useState,
    memo,
    forwardRef,
    useImperativeHandle,
  } from "react";
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
  import InfoAboutUser from "../users/infoAboutUser";
  import DeleteBookConfirmation from "../books/deleteBookConfirmation";
  import UpdateBookForm from '../books/updateBookForm';
  
  const columns = [
    {
        id: "cardID",
        label: "Vartotojo ID",
        width: 50,
        minWidth: 50,
      },
      {
        id: "firstName",
        label: "Vardas",
        width: 100,
        minWidth: 50,
      },
      {
        id: "lastName",
        label: "Pavardė",
        width: 100,
        minWidth: 50,
      },
      {
        id: "grade",
        label: "Klasė",
        width: 50,
        minWidth: 20,
      },
    {
      id: "bookID",
      label: "Knygos ID",
      width: 50,
      minWidth: 50,
    },
    { id: "title", label: "Pavadinimas", width: 150, minWidth: 150 },
    { id: "dateGiveOut", label: "Išdavimo data", width: 100, minWidth: 80 },
    { id: "returnDate", label: "Gražinimo data", width: 100, minWidth: 80 },
    {
      id: "actions",
      label: "Veiksmai",
      width: 100,
      minWidth: 100,
      align: "right",
    },
  ];
  
  const BooksDelayTable = forwardRef((props, ref) => {

  
    const [showUserInfo, setshowUserInfo] = useState(false);
    const [userInfo, setUserInfo] = useState({
      bookID: "",
      title: "",
      author: "",
    });
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleShowBookInfo = (row) => {
        setUserInfo({
        cardID: row.cardID,
        firstName: row.firstName,
        lastName: row.lastName,
      });
      showUserInfo ? setshowUserInfo(false) : setshowUserInfo(true);
    };
  
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

    const handleChange = () => {
        showUserInfo ? setshowUserInfo(false) : setshowUserInfo(true);
      };
  
  
    return (
      <>
        {props.isLoading ? (
          <CircularProgress sx={{ display: "flex", margin: "150px auto" }} />
        ) : (
          <Paper className="userTable" sx={{ width: "95%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
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
                  {props.list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "actions" ? (
                                  <>
                                    <Button
                                      onClick={() => handleShowBookInfo(row)}
                                    >
                                      Informacija
                                    </Button>
                                  </>
                                
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
              count={props.list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
        {showUserInfo ? (
          <InfoAboutUser
            userInfo={userInfo}
            handleChange={handleChange}
          />
        ) : null}
  
      </>
    );
  });
  
  export default memo(BooksDelayTable);
  