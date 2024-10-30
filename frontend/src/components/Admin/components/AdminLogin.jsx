import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css'
import { contentProvider } from './ContextProvider';
function AdminLogin() {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {baseURL,setAdminUser}=useContext(contentProvider)
    function handleSubmit(e){
        e.preventDefault();
        axios.post(baseURL+"/api/admin/login",{username,password},{withCredentials:true})
        .then(response=>{
            toast(response.data.message);
            setAdminUser(response.data.user);
            setTimeout(() => {
                navigate("/admin")
            }, 1500);
        })
        .catch(error=>{
            console.log(error);
            toast(error.response.data.message||"Login Failed")
        })
    }
    return (
        <div className="admin-login">
            <h1>Login To Admin</h1>
            <div className="login-box">
                <form method='post'onSubmit={handleSubmit}>
                    <label htmlFor="">Username:</label>
                    <input type="text"
                        className='form-input'
                        name='username'
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="">Password:</label>
                    <input type="password"
                        className='form-input'
                        name='Password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Login</button>
                </form>
                <ToastContainer/>
            </div>
        </div>
    )
}
export default AdminLogin;