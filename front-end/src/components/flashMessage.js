import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { MessageContext } from "../context/messageContext";

export default function TransitionAlerts() {
  const [message, severity, showMessageBox, handleMessageShow, closeError] =
    useContext(MessageContext);

  return (
    <Box className="alert error">
      <Collapse in={showMessageBox}>
        <Alert
          variant="filled"
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
