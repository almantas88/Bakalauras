import React, { useState, useEffect } from "react";
import MenuDrawer from "../components/menuDrawer";
import { getCurrentUser } from "../services/authServices";
import Grid from "@mui/material/Grid";

import Card from "../components/settings/card";

import imageHeaderGrade from "../public/images/Klase.jpg";
import imageHeaderExcel from "../public/images/excel.jpg";



const columns = [
  { field: "bookID", headerName: "ID", width: 110 },
  { field: "title", headerName: "Knygos pavadinimas", width: 430 },
  { field: "author", headerName: "Autorius", width: 230 },
  { field: "takeDate", headerName: "Paėmimo data", width: 230 },
  { field: "returnDate", headerName: "Iki kada gražinti", width: 230 },
];

export default function StudentsPage() {
  //const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRole();
  }, []);

  async function getRole() {
    try {
      const user = await getCurrentUser();
      if (!user) window.location = "/unauthorized";
      if (user.role !== "ADMIN") {
        window.location = "/unauthorized";
      }
    } catch (error) {
      window.location = "/unauthorized";
    }
  }

  return (
    <div>
      <MenuDrawer />
      <h1 className="centerHeader">Nustatymų puslapis</h1>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item>
          <Card
            header="Klasių redagavimas"
            description="Klasių redagavimo įrankis skirtas pridėti arba pašalinti klases."
            imageHeader={imageHeaderGrade}
          />
        </Grid>
        <Grid item>
          <Card  header="Mokinių importavimas"
            description="Didelio kiekio mokinių impotavimas naudojant excel csv formato failą."
            imageHeader={imageHeaderExcel}/>
        </Grid>
      
        <Grid item>
          <Card  header="Knygų importavimas"
            description="Didelio kiekio knygų impotavimas naudojant excel csv formato failą."
            imageHeader={imageHeaderExcel}/>
        </Grid>
      </Grid>
    </div>
  );
}
