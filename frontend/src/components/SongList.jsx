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
                songs?.map((val, index, key) => {
                    return (
                        <div className='song-item'>
                            <p key={val.name}>{index + 1}. {val.name}</p>
                            <button
                                className='play-button'
                                onClick={() => onPlay(index)}
                            > <IoPlayCircleOutline fontSize={24} /></button>
                        </div>
                    )
                })
            ) : (
                <p>No songs available</p>
            )}
        </div>
    );
};
export default SongList;