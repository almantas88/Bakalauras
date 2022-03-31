import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { MessageContext } from "../context/messageContext";
import Snackbar from "@mui/material/Snackbar";

export default function TransitionAlerts() {
  const messageContext = useContext(MessageContext);

  return (
    // <Box className="alert error">
    //   <Collapse in={messageContext.showMessageBox}>

    //     <Alert
    //       variant="filled"
    //       severity={messageContext.severity}
    //       action={
    //         <IconButton
    //           aria-label="close"
    //           color="inherit"
    //           size="small"
    //           onClick={messageContext.closeError}
    //         >
    //           <CloseIcon fontSize="inherit" />
    //         </IconButton>
    //       }
    //       sx={{ mb: 2 }}
    //     >
    //       {messageContext.message}
    //     </Alert>
    //   </Collapse>
    // </Box>
    <Snackbar
      open={messageContext.open}
      autoHideDuration={6000}
      onClose={messageContext.handleClose}
    >
      <Alert
        onClose={messageContext.handleClose}
        severity={messageContext.severity}
        sx={{ width: "100%" }}
      >
        {messageContext.message}
      </Alert>
    </Snackbar>
  );
}
