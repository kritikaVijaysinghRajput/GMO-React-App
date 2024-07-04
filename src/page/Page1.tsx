import React from "react";
import { useLocation } from "react-router-dom";
import Form from "../components/Form";
import { Container, Typography } from "@mui/material";

const Page1: React.FC = () => {
  const location = useLocation();

  const message = location.state?.message || "";

  return (
    <Container maxWidth="lg">
      {message && (
        <Typography variant="h6" color="error" gutterBottom>
          {message}
        </Typography>
      )}
      <Form />
    </Container>
  );
};

export default Page1;
