import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register({ baseURL }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [otptoggle, setOtpToggle] = useState(false);
    const [OTP, setOTP] = useState('');
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
                toast.success(response.data.message, { theme: "colored" });
                setTimeout(() => {
                    setOtpToggle(true);
                }, 2000);
            })
            .catch(err => {
                toast.error(err.response.data.message || "OTP failed!", { theme: "colored" });
            });
    };

    const handleOTP = (event) => {
        event.preventDefault();
        axios.post(baseURL + '/verify-otp', { name, email, password, mobile, OTP }, { withCredentials: true })
            .then(response => {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            })
            .catch(err => {
                toast.error(err.response.data.message || "Registration Failed");
            });
    }

    return (
        <div className="login-form">
            {otptoggle ? (
                <div>
                    <form onSubmit={handleOTP} method="post">
                        <label>Enter Your OTP</label>
                        <input type="tel" maxLength={6} required placeholder="OTP" value={OTP} onChange={(e) => { setOTP(e.target.value) }} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="logo">
                        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="" />
                        <h3>JS MUSIC</h3>
                    </div>
                    <ToastContainer />
                    <form onSubmit={handleRegister} method="post" style={{ marginTop: "25vh" }}>
                        <h2>Register</h2>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on"
                            required
                        />
                        <div className="pass-cont">
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
                        <label>Mobile</label>
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
                </>
            )}
        </div>
    );
}

export default Register;
