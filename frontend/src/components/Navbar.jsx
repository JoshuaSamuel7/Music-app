import React, { useState } from "react";
import './css/navbar.css';
import { FaHome, FaSearch } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi"; 
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar({ setEditAccess,setUser,baseURL}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
    axios.get(baseURL+"/logout",{withCredentials:true})
    .then(response=>{
        alert("Logged out",response.data.message);
        setUser(null);
        navigate("/login");
    })
    .catch(err=>{
        toast.error(err?.data?.message||"Logout Failed",{theme:"colored"})
    })
}
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
        <div className="nav-logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
            alt="Spotify Logo"
          />
          <h3>JS MUSIC</h3>
        </div>
        <a href="/" onClick={() => setMenuOpen(false)}>
          <FaHome className="icons" />
          Home
        </a>
        <a href="#search" onClick={() => setMenuOpen(false)}>
          <FaSearch className="icons" />
          Search
        </a>
        <a href="#songlist" onClick={() => setMenuOpen(false)}>
          <BiLibrary className="icons" />
          My Playlist
        </a>
        <a
          href="#edit"
          onClick={(e) => {
            e.preventDefault();
            setEditAccess(true);
            alert("Edit access approved! Scroll down!");
            setMenuOpen(false);
          }}
        >
          <MdEdit className="icons" />
          Edit Playlist
        </a>
        {menuOpen?<button className="nav-btn" onClick={handleLogout}>Logout</button>: ""}
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </div>
    </div>
  );
}

export default Navbar;
