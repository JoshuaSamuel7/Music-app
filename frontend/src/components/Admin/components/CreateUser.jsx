import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contentProvider } from './ContextProvider';
import AdminNavbar from './AdminNavbar';
import './AdminLogin.css'
function CreateUser() {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const {baseURL}=useContext(contentProvider)
    function handleSubmit(e){
        e.preventDefault();
        axios.post(baseURL+"/api/admin/create-user",{username,password,name},{withCredentials:true})
        .then(response=>{
            console.log(response.data.message);
            toast.success(response.data.message,{theme:"colored"});
            setTimeout(() => {
                navigate("/admin")
            }, 2000);
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.response.data.message||"Register Failed",{theme:'colored'})
        })
    }
    return (
        <div className="admin-login">
            <AdminNavbar></AdminNavbar>
            <h1>Create Users To Admin</h1>
            <div className="login-box">
                <form method='post'onSubmit={handleSubmit}>
                <label htmlFor="">Name:</label>
                    <input type="text"
                        className='form-input'
                        name='Name'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <button type='submit'>Create User</button>
                </form>
                <ToastContainer/>
            </div>
        </div>
    )
}
export default CreateUser;