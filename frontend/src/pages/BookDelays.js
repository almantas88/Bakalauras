import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { Button } from "@mui/material";
import UsersSearch from "../components/users/usersSearch";
import AddUserForm from "../components/users/addUserForm";
import { getCurrentUser } from "../services/authServices";
import { getAllBookDelays } from "../services/studentsBooksServices";
import TableBooksDelay from "../components/bookDelays/tableBooksDelay";


export default function BookDelays() {

  const [isLoading, setIsLoading] = useState(false);
  const [bookDelays, setBookDelays] = useState([]);

  useEffect(() => {
    returnAllDelays();
    getRole();
  }, []);

  async function getRole() {
    try {
      const user = await getCurrentUser();
      if (!user) window.location = "/unauthorized";
      if (user.role !== "ADMIN") {
        if (user.role !== "STUDENT") window.location = "/unauthorized";
        window.location = "/student";
      }
    } catch (error) {
      window.location = "/unauthorized";
    }
  }

  async function returnAllDelays() {
    setIsLoading(true);
    try {
      const { data } = await getAllBookDelays();
      setBookDelays(data.delayedBooksUsers);
      console.log(data.delayedBooksUsers)
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <MenuDrawer page="Gražinimo laikas" />
     <TableBooksDelay list={bookDelays}/>
    </div>
  );
}
