import { createContext, useState } from "react";
export const MessageContext = createContext("Default Value");

export const MessageProvider = (props) => {
  const [message, setMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [severity, setSeverity] = useState("info");

  const closeError = () => {
    setMessage("");
    setShowMessageBox(false);
  };

  const handleMessageShow = (message, severity) => {
    setOpen(true);
    setShowMessageBox(true);
    setMessage(message);
    setSeverity(severity);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <MessageContext.Provider
      value={{handleMessageShow, closeError, message, setMessage, showMessageBox, setShowMessageBox, severity, setSeverity, open, setOpen, handleClose}}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
