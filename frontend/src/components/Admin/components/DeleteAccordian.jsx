import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import axios from 'axios';
import { contentProvider } from './ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';

function DeleteAccordion(props) {
    const { baseURL } = useContext(contentProvider);

    function handleDelete(username) {
        console.log(username);
        axios.delete(`${baseURL}/api/admin/delete-user`, {
            data: { username }, // Pass username in the 'data' property
            withCredentials: true
        })
        .then(response => {
            toast.success(response.data.message);
        })
        .catch(err => {
            console.log(err);
            toast.error(err.response?.data?.message || "Delete Failed");
        });
    }
    
    return (
        <Box sx={{ width: "10vw", margin: "4vh 2vw", display: 'flex' }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                >
                    <Typography>{props.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>Name: {props.name}</Typography>
                        <Typography>Username: {props.username}</Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(props.username)}
                        >
                            Delete
                        </Button>
                </AccordionDetails>
            </Accordion>
            <ToastContainer />
        </Box>
    );
}

export default DeleteAccordion;
