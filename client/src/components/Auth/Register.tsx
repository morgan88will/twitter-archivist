import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import AuthContext from "../../context/auth/authContext";
import "./styles.css";

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      setRegisterError(true);
    }
  }, [error, isAuthenticated, clearErrors, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ email, password });
    } catch {
      setRegisterError(true);
    }
    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ paddingBottom: 2 }}
        inputProps={{ maxLength: 40 }}
        error={registerError}
        helperText={
          registerError &&
          "Must register with a valid email not tied to another account and a password of 6 or more characters"
        }
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        error={registerError}
        inputProps={{ minLength: 6, maxLength: 40 }}
      />
      {loading ? (
        <CircularProgress sx={{ margin: "0 auto", marginTop: "10px" }} />
      ) : (
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      )}
      <p>
        Already have an account?{" "}
        <Typography
          variant="h6"
          noWrap
          component="button"
          onClick={() => navigate("/login")}
          sx={{
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "purple",
            textDecoration: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            border: "none",
            margin: "0 auto",
          }}
        >
          Login
        </Typography>
      </p>
    </form>
  );
};

export default Register;
