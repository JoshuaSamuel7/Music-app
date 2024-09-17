import React, { useState, useEffect } from 'react';
import './css/songlist.css';
import { MdDeleteForever } from "react-icons/md";
import './css/edit.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function EditSongs({ baseURL, songs: initialSongs, user }) {
  const [songs, setSongs] = useState(initialSongs); 

  const deleteSong = (val, index) => {
    axios.delete(`${baseURL}/delete-songs`, {
      data: { email: user.email, index },
      withCredentials: true, 
    })
      .then(response => {
        toast.success(response.data.message);
        const updatedSongs = songs.filter((song, i) => i !== index);  
        setSongs(updatedSongs);  
      })
      .catch(err => {
        toast.error("Delete Failed");
      });
  };

  useEffect(() => {
    setSongs(initialSongs); 
  }, [initialSongs]);

  return (
    <div id='edit'>
      <h2>Edit Songs</h2>
      {songs?.length > 0 ? (
        songs.map((val, index) => (
          <div className='song-item' key={index}>
            <p>{index + 1}. {val.name}</p>
            <button
              className='play-button'
              onClick={() => deleteSong(val, index)}
            >
              <MdDeleteForever fontSize={24} />
            </button>
          </div>
        ))
      ) : (
        <p>No songs available</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default EditSongs;
