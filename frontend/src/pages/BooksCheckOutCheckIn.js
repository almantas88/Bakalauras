import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "../components/menuDrawer";
import { Button } from "@mui/material";
import BookSearch from "../components/booksCheckInOut/bookSearchCheckInOut";
import { BooksContext } from "../context/booksContext";
import { getCurrentUser } from "../services/authServices";
import AddBookForm from "../components/books/addBookForm";
import {getAllBooks} from '../services/bookServices'

export default function Books() {
  const booksContext = useContext(BooksContext);

  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    getRole();
    booksContext.allBooksList <= 0 && returnAllBooks();
    console.log(booksContext.allBooksList);
    
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

  console.log("hi");

  return (
    <div>
      <MenuDrawer />
      <h1 className="centerHeader">Knygų išdavmas/gražinimas</h1>
      
      <BookSearch booksList={booksContext.allBooksList} isLoading={isLoading}></BookSearch>
      
    </div>
  );
}
