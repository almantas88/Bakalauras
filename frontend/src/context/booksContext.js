import { createContext, useState } from "react";
export const BooksContext = createContext([]);

export const BooksProvider = (props) => {
  const [allBooksList, setAllBooksList] = useState([]);

  const handleDeleteBookContext = (bookID) => {
    const bookListAfterDeletion = allBooksList.filter((element) =>  element.bookID !== bookID  )
    setAllBooksList(bookListAfterDeletion);
  };

  const handleUpdateBookContext = (bookID, values) => {
    const bookListAfterUpdate = allBooksList.filter((element) =>  element.bookID !== bookID   )
    setAllBooksList([
      {
        bookID: values.bookID,
        title: values.title,
        author: values.author,
        description: values.description,
      },
      ...bookListAfterUpdate,
    ]);
  };

  return (
    <BooksContext.Provider
      value={{allBooksList, setAllBooksList, handleDeleteBookContext, handleUpdateBookContext}}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
