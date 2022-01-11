import { createContext, useState, useContext } from "react";
import { MessageContext } from "./messageContext";
export const BooksCartContext = createContext([]);

export const BooksCartProvider = (props) => {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  const [allBooksCartList, setAllBooksCartList] = useState([]); //To store book objects

  const handleDeleteBooksCartContext = (bookID) => {
    const bookListAfterDeletion = allBooksCartList.filter(
      (element) => element.bookID !== bookID
    );
    setAllBooksCartList(bookListAfterDeletion);
  };

  const handleAddBooksCartContext = (values) => {
    const book = {
      bookID: values.bookID,
      title: values.title,
      author: values.author,
      description: values.description,
    };

    if (allBooksCartList.some((element) => element.bookID === values.bookID)) {
      handleMessageShow("Ši knyga jau krepšelyje", "error");
    } else {
      setAllBooksCartList([book, ...allBooksCartList]);
    }
  };

  return (
    <BooksCartContext.Provider
      value={{
        allBooksCartList,
        setAllBooksCartList,
        handleDeleteBooksCartContext,
        handleAddBooksCartContext,
      }}
    >
      {props.children}
    </BooksCartContext.Provider>
  );
};
