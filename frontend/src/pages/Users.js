import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { Button } from "@mui/material";
import UsersSearch from "../components/users/usersSearch";
import AddUserForm from "../components/users/addUserForm";
import { getCurrentUser } from "../services/authServices";
import { getAllUsers } from "../services/userServices";
import { UsersContext } from "../context/usersContext";

export default function Users() {
  const usersContext =
    useContext(UsersContext);

  //const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewUserForm, setshowNewUserForm] = useState(false);

  useEffect(() => {
    usersContext.allUserslist <= 0 && returnAllUsers();
    getRole();
  }, []);

  async function getRole() {
    try {
      const user = await getCurrentUser();
      if (!user) window.location = "/unauthorized";
      if (user.role !== "ADMIN") {
        window.location = "/student";
      }
    } catch (error) {
      window.location = "/unauthorized";
    }
  }

  async function returnAllUsers() {
    setIsLoading(true);
    try {
      const { data } = await getAllUsers();

      usersContext.setAllUsersList(data.users);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  const handleShowUserAddForm = () => {
    showNewUserForm ? setshowNewUserForm(false) : setshowNewUserForm(true);
  };

  return (
    <div>
      <MenuDrawer />
      <h1 className="centerHeader">Vartotojai</h1>
      <Button
        onClick={handleShowUserAddForm}
        className="addUser-btn"
        variant="contained"
      >
        Pridėti vartotoją
      </Button>
      <UsersSearch usersList={usersContext.allUserslist} isLoading={isLoading}></UsersSearch>
      {showNewUserForm ? (
        <AddUserForm
          handleChange={handleShowUserAddForm}
          setUsersList={usersContext.setAllUsersList}
          usersList={usersContext.allUserslist}
        />
      ) : null}
    </div>
  );
}
