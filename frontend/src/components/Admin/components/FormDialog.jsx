import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { contentProvider } from './ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function FormDialog({ open, handleClose, row }) {
    const navigate=useNavigate();
    const [name, setName] = useState(row.name);
    const changeName = (e) => setName(e.target.value);
    const [email, setEmail] = useState(row.email);
    const changeEmail = (e) => setEmail(e.target.value);
    const [mobile, setMobile] = useState(row.mobile);
    const changeMobile = (e) => setMobile(e.target.value);
    const id=row._id;
    
    const { baseURL } = useContext(contentProvider);
    const handleChanges = () => {        
        axios.put(baseURL + "/api/admin/put-music-users", { id, email,name, mobile }, { withCredentials: true })
            .then(response => {
                toast.success(response.data.message||"Update Success", { theme: "colored" })
                setTimeout(() => {
                    window.location.reload()
                    navigate("/admin/manage-music-users")
                }, 1000);
        })
            .catch(err => toast.error(err.response.data.message, { theme: "colored" }));
        handleClose();
    };

    return (
        <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Users</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    value={name}
                    onChange={changeName}
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    value={email}
                    onChange={changeEmail}
                    margin="dense"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    value={mobile}
                    onChange={changeMobile}
                    margin="dense"
                    label="Mobile"
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleChanges}>Save</Button>
            </DialogActions>
        </Dialog>
        <ToastContainer/>

        </>
    );
}

export default FormDialog;
