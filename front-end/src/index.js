import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MessageProvider } from "./context/messageContext";
import { UsersProvider } from "./context/usersContext";
import { BooksProvider } from "./context/booksContext";
import { BooksCartProvider } from "./context/booksCartContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <UsersProvider>
        <BooksProvider>
          <BooksCartProvider>
            <App />
          </BooksCartProvider>
        </BooksProvider>
      </UsersProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
