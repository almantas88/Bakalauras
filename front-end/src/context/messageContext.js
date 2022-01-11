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
    setShowMessageBox(true);
    setMessage(message);
    setSeverity(severity);
  };

  const values = [
    message,
    severity,
    showMessageBox,
    handleMessageShow,
    closeError,
  ];

  return (
    <MessageContext.Provider
      value={values}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
