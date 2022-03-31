import { createContext, useState, useContext } from "react";
import { MessageContext } from "./messageContext";
import {retrieveCurrentUserBooks} from "../services/booksManagement";
export const BooksCartContext = createContext([]);

export const BooksCartProvider = (props) => {
  const messageContext =
    useContext(MessageContext);

  const [action, setAction] = useState('');
  const [allBooksCartList, setAllBooksCartList] = useState([]); //To store book objectsID
  const [allBooksCartListID, setAllBooksCartListID] = useState([]); //To store book objectsID
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserBookList, setCurrentUserBookList] = useState([]);

  const [allBookForShowingWithoutUserBooks, setAllBookForShowingWithoutUserBooks] = useState([])

  const handleDeleteBooksCartContext = (values) => {
    const bookListAfterDeletion = allBooksCartList.filter(
      (element) => element.bookID !== values.bookID
    );

    const bookListIDAfterDeletion = allBooksCartListID.filter(
      (element) => element !== values._id
    );

    setAllBooksCartListID(bookListIDAfterDeletion);
    setAllBooksCartList(bookListAfterDeletion);

    console.log("after deletion ID:", allBooksCartListID);
  };

  const handleAddBooksCartContext = (values) => {
    const book = {
      _id: values._id,
      bookID: values.bookID,
      title: values.title,
      author: values.author,
      description: values.description,
    };

    if (allBooksCartList.some((element) => element.bookID === values.bookID)) {
      messageContext.handleMessageShow("Ši knyga jau krepšelyje", "error");
    } else {
      setAllBooksCartListID([book._id, ...allBooksCartListID]);
      console.log("sarasas isiuntimui i back end turi but tik mongo id: ", allBooksCartListID);
      setAllBooksCartList([book, ...allBooksCartList]);
    }
  };

  const handleRetrieveCurrentUserBooks = async (cardID) => {
    try {
      const currentUserBooks = await retrieveCurrentUserBooks(cardID);
      setCurrentUserBookList(currentUserBooks.data.user.books);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleBookForShowing = () => {
    console.log(allBookForShowingWithoutUserBooks)
    const filteredList = allBookForShowingWithoutUserBooks.filter(
      (element) => !currentUserBookList.some(e => e.bookId.bookID === element.bookID)
    )
    console.log("tikrinu 2ia", allBookForShowingWithoutUserBooks,currentUserBookList,filteredList);
    //setAllBookForShowingWithoutUserBooks(filteredList);
    
  }

  return (
    <BooksCartContext.Provider
      value={{
        allBooksCartList,
        setAllBooksCartList,
        handleDeleteBooksCartContext,
        handleAddBooksCartContext,
        currentUser,
        setCurrentUser,
        action, setAction,
        currentUserBookList,
        handleRetrieveCurrentUserBooks,setCurrentUserBookList,
        allBooksCartListID,
        setAllBooksCartListID,
        allBookForShowingWithoutUserBooks, setAllBookForShowingWithoutUserBooks,
        handleBookForShowing
      }}
    >
      {props.children}
    </BooksCartContext.Provider>
  );
};
