import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { Button } from "@mui/material";
import BookSearch from "../components/booksCheckInOut/bookSearchCheckInOut";
import { BooksContext } from "../context/booksContext";
import { getCurrentUser } from "../services/authServices";
import AddBookForm from "../components/books/addBookForm";
import { getAllBooks } from "../services/bookServices";
import { getAllUsers } from "../services/userServices";
import { BooksCartContext } from "../context/booksCartContext";
import UsersSearch from "../components/booksCheckInOut/usersSearchCheckInOut";
import { UsersContext } from "../context/usersContext";


export default function Books() {
  const booksContext = useContext(BooksContext);
  const booksCartContext = useContext(BooksCartContext);
  const usersContext = useContext(UsersContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRole();
    booksContext.allBooksList <= 0 && returnAllBooks();
    usersContext.allUserslist <= 0 && returnAllUsers();
    console.log(booksContext.allBooksList);
  }, []);

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
      console.log(data.books);
      booksContext.setAllBooksList(data.books);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  console.log(booksCartContext.currentUserCart);

  return (
    <div>
      <MenuDrawer />

      {booksCartContext.currentUserCart &&
      Object.keys(booksCartContext.currentUserCart).length === 0 &&
      Object.getPrototypeOf(booksCartContext.currentUserCart) ===
        Object.prototype ? (
        <h1 className="centerHeader">Knygų išdavmas/gražinimas</h1>
      ) : (
        <>
          <h1 className="centerHeader">Knygų išdavmas/gražinimas</h1>
          <h2 className="centerHeader">{`${booksCartContext.currentUserCart.firstName} ${booksCartContext.currentUserCart.lastName}, ${booksCartContext.currentUserCart.grade} klasė`}</h2>

          
        </>
      )}

      {booksCartContext.currentUserCart &&
      Object.keys(booksCartContext.currentUserCart).length === 0 &&
      Object.getPrototypeOf(booksCartContext.currentUserCart) ===
        Object.prototype ? (
        <UsersSearch
          usersList={usersContext.allUserslist}
          isLoading={isLoading}
        ></UsersSearch>
      ) : (
        <BookSearch
          booksList={booksContext.allBooksList}
          isLoading={isLoading}
        ></BookSearch>
      )}
    </div>
  );
}
