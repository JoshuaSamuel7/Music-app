import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player';
import axios from "axios";
import './css/Player.css';
import { FiPauseCircle } from "react-icons/fi";
import { IoPlayCircleOutline } from "react-icons/io5";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiShuffle } from "react-icons/bi";
import { FaShuffle } from "react-icons/fa6";

function Player({user,baseURL,songs, currentSongIndex, setCurrentSongIndex,playing,setPlaying }) {
    const [played, setPlayed] = useState({ playedSeconds: 0, played: 0 });
    const [duration, setDuration] = useState(0);
    const [shuffle, setShuffle] = useState(true);
    const [playedSongs, setPlayedSongs] = useState([]);

    useEffect(() => {
        axios.post(baseURL + "/recent", { email: user.email, recent: songs[currentSongIndex]?.name }, { withCredentials: true })
          .then(response => {
            console.log(response.data);  // Log the response data to check
          })
          .catch(err => {  // Add proper error handling
            console.error("Error while posting recent song:", err);
          });
      }, [currentSongIndex]);
      
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                return;
            }
            if (event.code === 'Space') {
                event.preventDefault(); 
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playing]);
    const playerRef = useRef(null);

    const invshuffle = () => {
        setShuffle(!shuffle);
        handleshuffle();
    }

    const handleshuffle = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (playedSongs.includes(randomIndex) && playedSongs.length < songs.length);

        setPlayedSongs(prev => {
            const updatedPlayed = [...prev, randomIndex];
            if (updatedPlayed.length === songs.length) {
                return [];
            }
            return updatedPlayed;
        });

        setCurrentSongIndex(randomIndex);
        setPlaying(true);
    };

    const handleNext = () => {
        if (shuffle) {
            return handleshuffle();
        }
        setCurrentSongIndex((prevIndex) =>
            prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
        setPlaying(true);
    };

    const handlePrevious = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === 0 ? songs.length - 1 : prevIndex - 1
        );
        setPlaying(true);
    };

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    const handleProgress = (state) => {
        setPlayed(state);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const progressPercentage = played.playedSeconds && duration ? (played.playedSeconds / duration) * 100 : 0;

    const handleSeek = (event) => {
        const progressBar = event.target;
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newTime = (offsetX / progressBar.clientWidth) * duration;

        if (playerRef.current) {
            playerRef.current.seekTo(newTime);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <ReactPlayer
                ref={playerRef}
                url={songs[currentSongIndex]?.url}
                controls
                onEnded={shuffle ? handleshuffle : handleNext}
                onProgress={handleProgress}
                onDuration={handleDuration}
                playing={playing}
                width="0"
                height="0"
                className="custom-react-player"
            />

            <div className="player-container">
                <h4 className="song-title">{songs[currentSongIndex]?.name}</h4>
                <div className="player-wrapper">
                    <div className="controls">
                        <button className="control-btn" onClick={handlePrevious}><BiSolidSkipPreviousCircle /></button>
                        <button className="control-btn" onClick={togglePlayPause}>{playing ? <FiPauseCircle /> : <IoPlayCircleOutline />}</button>
                        <button className="control-btn" onClick={handleNext}><BiSolidSkipNextCircle /></button>
                        <button className="control-btn" onClick={invshuffle}>{shuffle ? <FaShuffle style={{ color: 'green' }} fontSize={25} /> : <BiShuffle style={{ color: 'white' }} fontSize={25} />}</button>
                    </div>
                    <div className="progress">
                        <p>{formatTime(played.playedSeconds)}</p>
                        <div
                            className="progress-bar-container"
                            onClick={handleSeek}>
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${progressPercentage}%`
                                }}
                            >
                                <div className="dot"></div>
                            </div>
                        </div>
                        <p>{formatTime(duration)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
