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


export default function GradeSettings(props) {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

    const gradesContext = useContext(GradesContext);

  const [isLoading, setIsLoading] = useState(false);


  const [values, setValues] = useState({
    grade: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  //useeffect gettint visas klases
  useEffect(() => {
    gradesContext.gradesList <= 0 && getAllGrades();
    console.log(gradesContext);
  }, []);

  async function getAllGrades() {
    setIsLoading(true);
    try {
      const { data } = await getGrades();
      console.log(data.grades);
      gradesContext.setGradesList(data.grades);
      console.log(gradesContext.gradesList);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  async function postNewGrade() {
    setIsLoading(true);
    try {
      const { data } = await createNewGrade(values.grade);
      setValues({
        ...values,
        grade: "",
      });
      console.log(data.newGrade);

      gradesContext.addGradeToFrontEnd(data.newGrade);
      handleMessageShow(data.msg, "success");
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
    setIsLoading(false);
  }


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
          <Grid item xs={10}>
            <h2>Redaguoti klases</h2>
          </Grid>
          <Grid item xs={2} onClick={props.handleChange}>
            <CloseIcon sx={{ fontSize: 40, color: "#252525", padding: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <h3>Pridėti klasę</h3>
          </Grid>
          <Grid item xs={8}>
            <TextField
              name="grade"
              value={values.grade}
              onChange={handleInputChange}
              fullWidth
              required
              autoComplete="disabled"
              label="Klasė"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={postNewGrade}
              size="large"
              variant="contained"
              sx={{ width: "100%", height: "100%" }}
            >
              Pridėti
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h3>Esamos klasės</h3>
          </Grid>
          <Grid item xs={12}>
            <GradeTable rows={gradesContext.gradesList} filterGrades={gradesContext.filterGrades} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
