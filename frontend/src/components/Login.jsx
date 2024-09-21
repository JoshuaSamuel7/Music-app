import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './css/login.css'
function Login({ setUser, baseURL }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL + "/login", { email, password }, { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                toast.success(response.data.message,{theme:"colored"});
                setTimeout(()=>{
                    navigate("/");
                },2000)
            })
            .catch(err => {
                toast.error(err.response?.data?.message || "Login failed",{theme:"colored"});
            });
    };

    return (
        <div className="login-form">
            <div className="logo">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="" />
                <h3>JS MUSIC</h3>
            </div>
            <form onSubmit={handleSubmit} method="post">
                <h2>Login</h2>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="Password">Password:</label>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
