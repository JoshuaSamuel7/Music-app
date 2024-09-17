import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register({ baseURL }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();
    const handleRegister = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", { pauseOnHover: false, theme: "colored" });
            return;
        }
        axios.post(baseURL + "/register", { name, email, password, mobile }, { withCredentials: true })
            .then(response => {
                toast.success("Registration successful!",{theme:"colored"});
                console.log(response.data);
                navigate("/login")
            })
            .catch(err => {
                toast.error("Registration failed!",{theme:"colored"});
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
                />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="">Retype your Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="">Mobile</label>
                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile"
                    value={mobile}
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
