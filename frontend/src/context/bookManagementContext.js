import { createContext, useState, useContext } from "react";
import { MessageContext } from "./messageContext";
import {
  retrieveCurrentUserBooks,
  giveOutBooks,
  returnBooks
} from "../services/booksManagement";
import { BooksContext } from "../context/booksContext";
import { UsersContext } from "../context/usersContext";

export const BookManagementContext = createContext([]);

export const BookManagementProvider = (props) => {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const booksContext = useContext(BooksContext);
  const usersContext = useContext(UsersContext);

  //User state
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserBooks, setCurrentUserBooks] = useState([]);

  //For showing data state
  const [filteredBooksList, setFilteredBooksList] = useState([]); // Books list without users books
  const [selectedBooks, setSelectedBooks] = useState([]);

  //For sending data state

  //Functions

  const filterBooks = async (userBooks) => {
    const filteredList = booksContext.allBooksList.filter(
      (element) => !userBooks.some((e) => e.bookID === element.bookID)
    );
    setFilteredBooksList(filteredList);
  };

  const handleAddBook = (values) => {
    const book = {
      _id: values._id,
      bookID: values.bookID,
      title: values.title,
      author: values.author,
      description: values.description,
    };

    if (selectedBooks.some((element) => element.bookID === values.bookID)) {
      handleMessageShow("Ši knyga jau krepšelyje", "error");
    } else {
      setSelectedBooks([book, ...selectedBooks]);
    }
  };

  const handleDeleteBook = (values) => {
    const bookListAfterDeletion = selectedBooks.filter(
      (element) => element.bookID !== values.bookID
    );
    setSelectedBooks(bookListAfterDeletion);
  };

  const handleSubmitGiveout = async () => {
    var idArray = filterOnlyID(selectedBooks);
    try {
      await giveOutBooks({cardID: currentUser.cardID, bookIDarr: idArray });
      handleMessageShow("Pavyko išduoti knygas", "success");
      usersContext.handleUpdateUserBooksCountContext(currentUser.cardID, currentUser, "+", idArray.length);
      setSelectedBooks([]);
      setCurrentUser({});
      setCurrentUserBooks([]);
      
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  const handleSubmitReturn = async () => {
    var idArray = filterOnlyID(selectedBooks);
    try {
      await returnBooks({cardID: currentUser.cardID, bookIDarr: idArray });
      handleMessageShow("Pavyko gražinti knygas", "success");
      usersContext.handleUpdateUserBooksCountContext(currentUser.cardID, currentUser, "-", idArray.length);
      setSelectedBooks([]);
      setCurrentUser({});
      setCurrentUserBooks([]);
    } catch (error) {
      handleMessageShow(error.response.data.msg, "error");
    }
  };

  const filterOnlyID = (selectedBooks) => {
    let filteredID = selectedBooks.map((a) => a._id);
    return filteredID;
  };

  return (
    <BookManagementContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        selectedBooks,
        filteredBooksList,
        setFilteredBooksList,
        filterBooks,
        setCurrentUserBooks,
        currentUserBooks,
        handleAddBook,
        handleDeleteBook,
        handleSubmitGiveout,setSelectedBooks, handleSubmitReturn
      }}
    >
      {props.children}
    </BookManagementContext.Provider>
  );
};
