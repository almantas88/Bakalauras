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

export default function BasicTable(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  async function deleteGradeById(id) {
    setIsLoading(true);
    try {
      const { data } = await deleteGrade(id);
      console.log(data);
      props.filterGrades(id);
      handleMessageShow(data.msg, "success");
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
    setIsLoading(false);
  }

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
                <TableCell>Klasė</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.grade}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deleteGradeById(row._id)}>
                      <DeleteForeverIcon />
                    </Button>
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
