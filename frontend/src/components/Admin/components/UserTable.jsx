import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { contentProvider } from './ContextProvider';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialog from './FormDialog';
import { toast, ToastContainer } from 'react-toastify';

export default function UserTable() {
    const { baseURL } = useContext(contentProvider);
    const [musicUsers, setMusicUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get(baseURL + "/api/admin/get-music-users", { withCredentials: true })
            .then(response => setMusicUsers(response.data.musicUsers))
            .catch(err => console.log(err.response.data.message));
    }, [baseURL]);

    const handleDialogOpen = (row) => {
        setSelectedUser(row);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };
    const handleDelete = (row) => {
        const id = row._id;
        axios.delete(`${baseURL}/api/admin/delete-music-users/${id}`, { withCredentials: true })
            .then(response => {
                toast.success(response.data.message || "Success");
                setMusicUsers(prev => prev.filter(user => user._id !== id));
            })
            .catch(err => toast.error("Failed"));
    };
    
    return (
        <>
                <TableContainer component={Paper} sx={{ width: {
                    md:"50%",
                    xs:"90%",
                }, margin: "0 auto" }}>
                <Table sx={{ width: "50vw" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.NO</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {musicUsers.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.mobile}</TableCell>
                                <TableCell>
                                    <AddIcon onClick={() => handleDialogOpen(row)} />
                                    <DeleteIcon onClick={()=>handleDelete(row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer/>   
            {openDialog && selectedUser && (
                <FormDialog
                    open={openDialog}
                    row={selectedUser}
                    handleClose={handleDialogClose}
                />
            )}
        </>
    );
}
