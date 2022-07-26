import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import FolderPage from "./pages/FolderPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { FolderContext } from "./context/FolderContext";
import AuthContext from "./context/auth/authContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  const [folders] = useContext(FolderContext);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated && !loading ? (
                <Navigate to="/login" />
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {folders.map(({ name }) => (
            <Route key={name} path="folder/:name" element={<FolderPage />} />
          ))}
        </Routes>
        <Register />
      </div>
    </BrowserRouter>
  );
}

export default App;
