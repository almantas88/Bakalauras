import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { MessageContext } from "../../context/messageContext";

import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function ImportUserCsv(props) {
  const messageContext = useContext(MessageContext);

  const [file, setFile] = useState(null);
  const fileTypes = ["CSV"];
  const handleChange = (file) => {
    setFile(file);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadFileData = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("myFile", file);

    await axios
      .post(`${url}/imports/userImport`, data)
      .then((res) =>
        messageContext.handleMessageShow(
          "Sėkmingai importuoti vartotojai",
          "success"
        )
      )
      .catch((e) => {
        console.log(e);
        messageContext.handleMessageShow(
          "Importavimas nepavyko, patikrinkite duomenis",
          "error"
        );
      });

    props.handleChange();
    //messageContext.handleMessageShow("Sėkmingai importuoti vartotojai", "success");
  };

  return (
    <div className="addUserContainer">
      <Container
        sx={{
          width: 500,
          height: 300,
          marginTop: "110px",
          backgroundColor: "#F5F5F5",
          borderRadius: "1%",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <h2>Mokinių importavimas</h2>
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
          <Grid item xs={12}>
            {/* <input
              onChange={onFileChange}
              type="file"
              name="file"
              accept=".xlsx, .xls, .csv"
            ></input> */}
            <FileUploader
              handleChange={handleChange}
              label="Įterpkite arba veskite failą čia"
              hoverTitle="Paleiskite failą čia"
              name="file"
              types={fileTypes}
            />
          </Grid>
          <Grid item xs={12}>
            {file ? (
              <Button variant="contained" onClick={uploadFileData}>
                Importuoti
              </Button>
            ) : (
              <Button disabled variant="contained" onClick={uploadFileData}>
                Importuoti
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
