import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Registration from "./components/Registration/registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import ManageUsers from "./components/ManageUsers/ManageUsers";
function App() {
  const [authenticated, setAuthenticated] = useState(<Login />);
  const [path, setPath] = useState("/login");
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      setAuthenticated(<Home />);
      setPath("/");
    } else {
      setAuthenticated(<Login />);
      setPath("/login");
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token}/>
        <Routes>
          <Route path="/" element={authenticated} />
          <Route path="/home" element={authenticated} />
          <Route path="/manageusers" element={<ManageUsers/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div>
                <h1>Check your url</h1>
                <p>The url you have entered is incorrect</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
