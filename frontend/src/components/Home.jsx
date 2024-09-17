import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import Recent from "./Recent";
import SongList from "./SongList";
import Navbar from "./Navbar";
import EditSongs from "./EditSongs";
import './css/Home.css'
import Player from "./Player";
import axios from "axios";
import ReactLoading from 'react-loading'
function Home({ user, baseURL,setUser }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [songs, setSongs] = useState([]);
    const [loading,setLoading]=useState(true);
    const [editaccess,setEditAccess]=useState(false);
    const handlePlay = (index) => {
        setCurrentSongIndex(index);
        setPlaying(true)
    };
    useEffect(()=>{
        axios.post(baseURL+"/user-songs",{email:user.email},{withCredentials:true})
        .then(response=>{
            setSongs(response.data.songs)
            console.log(response.data);
            setLoading(false)
        })
        .catch(err=>{console.log(err);
            setLoading(false)
        })
    },[]);
    if(loading){return <div className="loading"><ReactLoading type="bubbles" color="#fff" height={50} width={100} /></div>}
    return (
        <div className="container">
            <Navbar setEditAccess={setEditAccess} setUser={setUser}baseURL={baseURL} />
            <div className="home">

                <UserProfile user={user} baseURL={baseURL} setUser={setUser} songs={songs} onPlay={handlePlay} />
                <Recent user={user} currentSongIndex={currentSongIndex} onPlay={handlePlay} baseURL={baseURL} />
                <SongList songs={songs} onPlay={handlePlay} baseURL={baseURL} />
                {editaccess?<EditSongs songs={songs} onPlay={handlePlay} baseURL={baseURL}user={user}setSongs={setSongs} />:""}
                <Player user={user} baseURL={baseURL} songs={songs} currentSongIndex={currentSongIndex} playing={playing} setPlaying={setPlaying} setCurrentSongIndex={setCurrentSongIndex} />
            </div>
        </div>

    )
}
export default Home;