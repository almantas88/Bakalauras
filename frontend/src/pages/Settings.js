import React, { useState, useEffect } from "react";
import MenuDrawer from "../components/menuDrawer";
import { getCurrentUser } from "../services/authServices";
import Grid from "@mui/material/Grid";
import Card from "../components/settings/card";
import imageHeaderGrade from "../public/images/Klase.jpg";
import imageHeaderExcel from "../public/images/excel.jpg";
import imageDatePicker from "../public/images/date.jpg";
import GradesSettings from "../components/settings/gradesSettings";
import ImportUserCsv from "../components/settings/importUserCsv";
import ImportBookCsv from "../components/settings/importBookCsv";
import DatePickerSettings from "../components/settings/datePickerSettings"

import CSVfileUser from "../public/Importavimo-sablonas.csv"
import CSVfileBook from "../public/Importavimo-sablonas-knygos.csv"

export default function StudentsPage() {
  //const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGradesSettings, setShowGradesSettings] = useState(false);
  const [showImportUserCsvSettings, setShowImportUserCsvSettings] = useState(false);
  const [showImportBookCsvSettings, setShowImportBookCsvSettings] = useState(false);
  const [showDatePickerSettings, setShowDatePickerSettings] = useState(false);

  useEffect(() => {
    getRole();
  }, []);

  async function getRole() {
    try {
      const user = await getCurrentUser();
      if (!user) window.location = "/unauthorized";
      if (user.role !== "ADMIN") {
        if(user.role !== "STUDENT")
        window.location = "/unauthorized";
        window.location = "/student";
      }
    } catch (error) {
      window.location = "/unauthorized";
    }
  }

  const handleShowUserAddForm = () => {
    showGradesSettings ? setShowGradesSettings(false) : setShowGradesSettings(true);
  };

  const handleShowUserCsvImport = () => {
    showImportUserCsvSettings ? setShowImportUserCsvSettings(false) : setShowImportUserCsvSettings(true);
  };
  const handleShowBookCsvImport = () => {
    showImportBookCsvSettings ? setShowImportBookCsvSettings(false) : setShowImportBookCsvSettings(true);
  };
  const handleShowDatePicker = () => {
    showDatePickerSettings ? setShowDatePickerSettings(false) : setShowDatePickerSettings(true);
  };

  return (
    <div>
      <MenuDrawer page="Nustatymai"/>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        sx={{marginTop: 1}}
      >
        <Grid item>
          <Card
            header="Klasių redagavimas"
            description="Klasių redagavimo įrankis skirtas pridėti arba pašalinti klases."
            imageHeader={imageHeaderGrade}
            handleChange={handleShowUserAddForm}
          />
        </Grid>
        <Grid item>
          <Card
            header="Mokinių importavimas"
            description="Didelio kiekio mokinių impotavimas naudojant excel csv formato failą. SVARBU, mokinių ID negali kartotis, jie turi būti unikalūs."
            imageHeader={imageHeaderExcel}
            handleChange={handleShowUserCsvImport}
            download = {CSVfileUser}
          />
          
        </Grid>

        <Grid item>
          <Card
            header="Knygų importavimas"
            description="Didelio kiekio knygų impotavimas naudojant excel csv formato failą. SVARBU, knygų ID negali kartotis, jie turi būti unikalūs."
            imageHeader={imageHeaderExcel}
            handleChange={handleShowBookCsvImport}
            download = {CSVfileBook}
          />
        </Grid>
        <Grid item>
          <Card
            header="Numatytoji data knygų išdavimui"
            description="Datos nustatymas knygų išdavimui. Nustatyta data bus visada parenkama knygų gražinimo laikui."
            imageHeader={imageDatePicker}
            handleChange={handleShowDatePicker}
          />
        </Grid>
      </Grid>

      {showGradesSettings ? <GradesSettings handleChange={handleShowUserAddForm}/> : null}
      {showImportUserCsvSettings ? <ImportUserCsv handleChange={handleShowUserCsvImport}/> : null}
      {showImportBookCsvSettings ? <ImportBookCsv handleChange={handleShowBookCsvImport}/> : null}
      {showDatePickerSettings ? <DatePickerSettings handleChange={handleShowDatePicker}/> : null}
    </div>
  );
}
