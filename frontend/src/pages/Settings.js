import React, { useState, useEffect } from "react";
import MenuDrawer from "../components/menuDrawer";
import { getCurrentUser } from "../services/authServices";
import Grid from "@mui/material/Grid";

import Card from "../components/settings/card";

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
      console.log(user);
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
          <Card />
        </Grid>
        <Grid item>
          <Card />
        </Grid>
        <Grid item>
          <Card />
        </Grid>
        <Grid item>
          <Card />
        </Grid>
      </Grid>
    </div>
  );
}
