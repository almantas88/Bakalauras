import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createNewGrade, deleteGrade } from "../../services/gradesServices";
import { MessageContext } from "../../context/messageContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserBooksInfoTable(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);


  return (
    <>
      {props.isLoading ? (
        <CircularProgress sx={{ display: "flex", margin: "130px auto" }} />
      ) : (
        <TableContainer
          sx={{ height: 350 }}
          className="owerflowingTable"
          component={Paper}
        >
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>KnygosID</TableCell>
                <TableCell>Knygos pavadinimas</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.bookID}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
