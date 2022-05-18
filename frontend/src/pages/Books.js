import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { Button } from "@mui/material";
import BookSearch from "../components/books/bookSearch";
import { BooksContext } from "../context/booksContext";
import { getCurrentUser } from "../services/authServices";
import AddBookForm from "../components/books/addBookForm";
import {getAllBooks} from '../services/bookServices'

export default function Books() {
  const booksContext = useContext(BooksContext);

  const [showNewBookForm, setshowNewBookForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowUserAddForm = () => {
    showNewBookForm ? setshowNewBookForm(false) : setshowNewBookForm(true);
  };

  useEffect(() => {
    booksContext.allBooksList <= 0 && returnAllBooks();
    console.log(booksContext.allBooksList);
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
  async function returnAllBooks() {
    setIsLoading(true);
    try {
      const { data } = await getAllBooks();
      console.log(data.books)
      booksContext.setAllBooksList(data.books);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <MenuDrawer page="knygos"/>
      <Button
        onClick={handleShowUserAddForm}
        className="addUser-btn"
        variant="contained"
      >
        Pridėti knygą
      </Button>
      <BookSearch booksList={booksContext.allBooksList} isLoading={isLoading}></BookSearch>
      {showNewBookForm ? (
        <AddBookForm
          handleChange={handleShowUserAddForm}
          setBooksList={booksContext.setAllBooksList}
          booksList={booksContext.allBooksList}
        />
      ) : null}
    </div>
  );
}
