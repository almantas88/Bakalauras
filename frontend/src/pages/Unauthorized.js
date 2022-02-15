import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotFound() {


  return (
    <div>
        <h1 className="notFound top">Tau čia negalima</h1>
        <h2 className="notFound">Neturi leidimo čia būti</h2>
        <Button className="notFound btn" variant="outlined"><Link className="link" to="/">Prisijungimo puslapis</Link></Button>
    </div>
  );
}
