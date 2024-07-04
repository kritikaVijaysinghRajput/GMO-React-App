import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

function Form() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user.name && user.phone && user.email) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/second-page");
      } catch (error) {
        console.error("ERROR STORING DATA!");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Form;
