import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { BooksContext } from "../context/booksContext";
import { getCurrentUser } from "../services/authServices";
import { getAllBooks } from "../services/bookServices";
import { getAllUsers } from "../services/userServices";
import UsersSearch from "../components/bookManagement/usersManagement_search";
import { UsersContext } from "../context/usersContext";
import { BookManagementContext } from "../context/bookManagementContext";
import Search from "../components/bookManagement/bookManagement_search";
import SearchWithDatePicker from "../components/bookManagement/bookManagement_search_with_datepicker";
import { retrieveCurrentUserBooks } from "../services/booksManagement";

export default function BooksManagement() {
  // const booksCartContext = useContext(BooksCartContext);

  const booksContext = useContext(BooksContext);
  const usersContext = useContext(UsersContext);
  const booksManagementContext = useContext(BookManagementContext);

  const [actionType, setActionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRole();
    booksContext.allBooksList <= 0 && returnAllBooks();
    usersContext.allUserslist <= 0 && returnAllUsers();
    setActionType("");
    booksManagementContext.setCurrentUser({});
    console.log("first effect");
  }, []);

  const fetchUserBooks = async () => {
    setIsLoading(true);
    try {
      const { data } = await retrieveCurrentUserBooks(
        booksManagementContext.currentUser.cardID
      );
      booksManagementContext.setCurrentUserBooks(data.user.books);
      booksManagementContext.filterBooks(data.user.books);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (booksManagementContext.currentUser.cardID) {
      fetchUserBooks();
    }
    console.log("sexond effect");
  }, [booksManagementContext.currentUser]);

  async function returnAllUsers() {
    setIsLoading(true);
    try {
      const { data } = await getAllUsers();
      usersContext.setAllUsersList(data.users);
    } catch (error) {
      console.log(error);
    }
  }

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

  async function returnAllBooks() {
    setIsLoading(true);
    try {
      const { data } = await getAllBooks();
      booksContext.setAllBooksList(data.books);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  var actionForChecking;
  if (actionType === "GIVEOUT") {
    actionForChecking = (
      <>
        <SearchWithDatePicker
          setAction={setActionType}
          firstList={booksManagementContext.filteredBooksList}
          secondList={booksManagementContext.selectedBooks}
          firstListHeading={"Knygos:"}
          secondListHeading={"Knygų krepšelis išdavimui:"}
          submit={booksManagementContext.handleSubmitGiveout}
          loading={isLoading}
        ></SearchWithDatePicker>
      </>
      // <BookSearchCheckOut
      //   booksList={booksCartContext.allBookForShowingWithoutUserBooks}
      //   isLoading={isLoading}
      // ></BookSearchCheckOut>
    );
  } else if (actionType === "RETURN") {
    actionForChecking = (
      <>
        <Search
          setAction={setActionType}
          firstList={booksManagementContext.currentUserBooks}
          secondList={booksManagementContext.selectedBooks}
          firstListHeading={"Vartotojo knygos:"}
          secondListHeading={"Knygų krepšelis gražinimui:"}
          submit={booksManagementContext.handleSubmitReturn}
          loading={isLoading}
        ></Search>
      </>
    );
  }

  return (
    <div>
      <MenuDrawer page="Knygų išdavmas ir gražinimas" />

      {booksManagementContext.currentUser &&
      Object.keys(booksManagementContext.currentUser).length === 0 &&
      Object.getPrototypeOf(booksManagementContext.currentUser) ===
        Object.prototype ? (
        <></>
      ) : (
        <>
          <h2 className="centerHeader">{`${booksManagementContext.currentUser.firstName} ${booksManagementContext.currentUser.lastName}, ${booksManagementContext.currentUser.grade} klasė`}</h2>
        </>
      )}

      {booksManagementContext.currentUser &&
      Object.keys(booksManagementContext.currentUser).length === 0 &&
      Object.getPrototypeOf(booksManagementContext.currentUser) ===
        Object.prototype ? (
        <UsersSearch
          setAction={setActionType}
          usersList={usersContext.allUserslist}
          isLoading={isLoading}
        ></UsersSearch>
      ) : (
        actionForChecking
      )}
    </div>
  );
}
