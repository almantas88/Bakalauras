import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MessageProvider } from "./context/messageContext";
import { UsersProvider } from "./context/usersContext";
import { BooksProvider } from "./context/booksContext";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <UsersProvider>
        <BooksProvider>
          <App />
        </BooksProvider>
      </UsersProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
