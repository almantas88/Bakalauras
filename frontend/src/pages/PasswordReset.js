import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MessageContext } from "../context/messageContext";
import { postPasswordReset } from "../services/studentsBooksServices";

export default function PasswordReset() {
  const messageContext = useContext(MessageContext);

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    // messageContext.handleMessageShow(
    //     "Naujas vartotojas sukurtas!",
    //     "success"
    //   );
  };

  const handleSubmit = async () => {
    try {
      const { data } = await postPasswordReset({email});
      messageContext.handleMessageShow(
        "Naujas slaptažodis išsiūstas į el. paštą!",
        "success"
      );
    } catch (error) {
      console.log(error.response.data);
      messageContext.handleMessageShow(error.response.data.msg, "error");
    }
  };

  return (
    <div className="notFoundContainer">
      <h2>Slaptažodžio atstatymas</h2>
      <h2>Įveskite savo el. paštą:</h2>
      <TextField
        onChange={handleInputChange}
        value={email}
        className="textInputPasswordReset"
        size="small"
        id="outlined-basic"
        label="El. paštas"
        variant="outlined"
      />
      <Button
        onClick={handleSubmit}
        className="notFound btn"
        size="small"
        variant="outlined"
      >
        Nustatyti iš naujo
      </Button>
    </div>
  );
}
