import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createNewUser } from "../../services/userServices";
import { MessageContext } from "../../context/messageContext";
import { GradesContext } from "../../context/gradesContext";
import GradeTable from "./gradeTable";
import {
  getGrades,
  createNewGrade,
  deleteGrade,
} from "../../services/gradesServices";
import axios from "axios";

const url = "http://localhost:5000/api/imports/userImport";

export default function ImportUserCsv(props) {
  const [file, setFile] = useState();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadFileData = (event) => {
    event.preventDefault();



     let data = new FormData();
     data.append("myFile", file);

     axios.post("http://localhost:5000/api/imports/userImport", data)
       .then((res) => console.log(res))
       .catch((e) => console.log(e));
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
          <input onChange={onFileChange} type="file" name="file"></input>
          <button onClick={uploadFileData}>
            Upload
          </button>
        </Grid>
      </Container>
    </div>
  );
}
