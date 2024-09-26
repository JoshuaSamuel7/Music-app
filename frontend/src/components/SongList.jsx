import React from 'react';
import './css/songlist.css';
import { IoPlayCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
function SongList({ songs, onPlay }) {
    const navigate = useNavigate()
    return (
        <div id='songlist'>
            <div className='songlist-head'>
                <h2>Music Player</h2>
                <button onClick={() => { navigate("/add-songs") }}>Add Songs</button>
            </div>

            {songs?.length > 0 ? (
                songs?.map((val, index) => {
                    return (
                        <div className='song-item'>
                            <p key={index}>{index + 1}. {val.name}</p>
                            <button
                                className='play-button'
                                onClick={() => onPlay(index)}
                            > <IoPlayCircleOutline fontSize={24} /></button>
                        </div>
                    )
                })
            ) : (
                <>
                <p>No songs available</p>
                <p>Use <a href="https://spotifydown.com/">Playlist Downloder</a> for downloading your playlist to mp3 and upload it here and hear it without ads.</p>
                </>
            )}
        </div>
    );
};
export default SongList;