import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddSongs from './components/Addsongs';
import ReactLoading from 'react-loading';
import { toast,ToastContainer } from 'react-toastify';
function App() {
    const [user, setUser] = useState(null);
    const baseURL = "http://localhost:8000";
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        axios.get(baseURL + "/current_user", { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, []);
    if(loading){return <div className="loading"><ReactLoading type="bubbles" color="#fff" height={50} width={100} /></div>}

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path='/add-songs' element={user ? <AddSongs baseURL={baseURL} user={user} /> : <Navigate to="/login" />} />
                    <Route path='/' element={user ? <Home user={user} setUser={setUser} baseURL={baseURL} /> : <Navigate to="/login" />} />
                    <Route path='/login' element={user ? <Navigate to="/" /> : <Login setUser={setUser} baseURL={baseURL} />} />
                    <Route path='/register' element={<Register baseURL={baseURL} />} />
                </Routes>
                <ToastContainer/>
            </div>
        </Router>
    );
}

export default App;
