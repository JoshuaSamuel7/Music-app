import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import './css/login.css'
function Register({ baseURL }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();
    const [hidePassword, setHidePassword] = useState(true); 

    const handleRegister = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", { pauseOnHover: false, theme: "colored" });
            return;
        }
        axios.post(baseURL + "/register", { name, email, password, mobile }, { withCredentials: true })
            .then(response => {
                toast.success("Registration successful!",{theme:"colored"});
                setTimeout(()=>{
                    navigate("/login");
                    window.location.reload();
                },2000)
                console.log(response.data);
            })
            .catch(err => {
                toast.error(err.response.data.message,{theme:"colored"});
                console.error(err);
            });
    };

    return (
        <div className="login-form">
            <div className="logo">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="" />
                <h3>JS MUSIC</h3>
            </div>
            <ToastContainer />
            <form onSubmit={handleRegister} method="post" style={{marginTop:"25vh"}}>
                <h2>Register</h2>
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                />                        <div className="pass-cont">
                <label>Password</label>
                <input
                    type={hidePassword ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                {hidePassword ? (
                    <FaEyeSlash className="eye" onClick={() => setHidePassword(false)} />
                ) : (
                    <FaEye className="eye" onClick={() => setHidePassword(true)} />
                )}
            </div>
            <div className="pass-cont">
                <label>Retype your Password</label>
                <input
                    type={hidePassword ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                {hidePassword ? (
                    <FaEyeSlash className="eye" onClick={() => setHidePassword(false)} />
                ) : (
                    <FaEye className="eye" onClick={() => setHidePassword(true)} />
                )}
            </div>
                <label htmlFor="">Mobile</label>
                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile"
                    value={mobile}
                    maxLength={10}
                    onChange={(e) => setMobile(e.target.value)}
                    autoComplete="off"
                    required
                />
                <button type="submit">Register</button>
                <p>Already have an Account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
}

export default Register;
