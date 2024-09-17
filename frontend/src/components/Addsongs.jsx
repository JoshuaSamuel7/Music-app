import React, { useState } from "react";
import './css/add.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from 'react-loading';
import{useNavigate} from 'react-router-dom';
function Addsongs({ baseURL, user }) {
    const [audioFiles, setAudioFiles] = useState([]);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        if (files.length>10){
            return toast.error("Maximum of 10 files");
        }
        setAudioFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('email', user.email);
        audioFiles.forEach(file => {
            formData.append('filename', file.name);
            formData.append('audio', file);
        });
                axios.post(baseURL+"/add-songs",formData,{withCredentials:true})
        .then(response=>{setLoading(false);toast.success(response.data.message); navigate("/");
        })
        .catch(err=>{
            toast.error(err)
        })
    }
    if(loading){return <div className="loading"><ReactLoading type="bubbles" color="#fff" height={50} width={100} /></div>}
    return (
        <div className="adds">
            <form onSubmit={handleSubmit}>
                <h2>Upload your Music Files here</h2>
                <p>Note: Your filename will be taken as the song Name</p>
                <input
                    type="file"
                    name="audio"
                    multiple
                    accept="audio/*"
                    onChange={handleFiles}
                    required
                />
                <div>
                    {audioFiles.length > 0 ? <h3>Uploaded Songs</h3> : ""}
                    {audioFiles.map((file, index) => (
                        <div key={index}>
                            <p>{file.name.split(".")[0]}</p>
                        </div>
                    ))}
                    {audioFiles.length > 0 ? <button type="submit">Submit</button> : ""}
                </div>
            </form>
            <ToastContainer/>

        </div>

    );

}

export default Addsongs;
