import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";
import axios from "axios";
import { contentProvider } from "./components/ContextProvider";
import CreateUser from "./components/CreateUser";
import DeleteUsers from "./components/DeleteUsers";
import ManageMusic from "./components/ManageMusic";
import Analytics from "./components/Analytics";

function Panel() {
  const baseURL = "http://localhost:8000";
  const [Adminuser, setAdminUser] = useState("");

  useEffect(() => {
    axios.get(baseURL + "/api/admin/verify", { withCredentials: true })
      .then(response => {
          setAdminUser(response.data.user);
      })
      .catch(() => {
        console.log("User not authenticated");
      });
  }, []);

  return (
    <contentProvider.Provider value={{ Adminuser, setAdminUser, baseURL }}>
      <Routes>
        <Route path="/login" element={Adminuser ? <Navigate to="/admin" /> : <AdminLogin />} />
        <Route path="/" element={Adminuser ? <Admin /> : <Navigate to="/admin/login" />} />
        <Route path="/create-users" element={Adminuser ? <CreateUser /> : <Navigate to="/admin/login" />} />
        <Route path="/delete-users" element={Adminuser ? <DeleteUsers /> : <Navigate to="/admin/login" />} />
        <Route path="/manage-music-users" element={Adminuser ? <ManageMusic /> : <Navigate to="/admin/login" />} />
        <Route path="/analytics" element={Adminuser ? <Analytics /> : <Navigate to="/admin/login" />} />

      </Routes>
    </contentProvider.Provider>
  );
}

export default Panel;
