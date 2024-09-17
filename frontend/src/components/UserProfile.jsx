import React from "react";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserProfile({user,baseURL,setUser,songs,onPlay,focus}) {
    const navigate=useNavigate();
    const handleLogout=()=>{
        axios.get(baseURL+"/logout",{withCredentials:true})
        .then(response=>{
            alert("Logged out",response.data.message);
            setUser(null);
            navigate("/login");
        })
        .catch(err=>{
            toast.error(err?.data?.message||"Logout Failed",{theme:"colored"})
        })
    }
    return (
        <div className="user-profile">
            <div className="search-bar">
                <SearchBar songs={songs} onPlay={onPlay} focus={focus}/>
            </div>
            <p>{user.name}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default UserProfile;