import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MessageProvider } from "./context/messageContext";
import { UsersProvider } from "./context/usersContext";
import { BooksProvider } from "./context/booksContext";
import { BooksCartProvider } from "./context/booksCartContext";
import { BookManagementProvider } from "./context/bookManagementContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <UsersProvider>
        <BooksProvider>
          <BookManagementProvider>
            <BooksCartProvider>
              <App />
            </BooksCartProvider>
          </BookManagementProvider>
        </BooksProvider>
      </UsersProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
