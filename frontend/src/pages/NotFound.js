import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotFound() {


  return (
    <div>
        <h1 className="notFound top">404</h1>
        <h2 className="notFound">Puslapis nerastas</h2>
        <Button className="notFound btn" variant="outlined"><Link className="link" to="/">Prisijungimo puslapis</Link></Button>
    </div>
  );
}
