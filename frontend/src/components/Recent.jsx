import React, { useEffect, useState } from "react";
import './css/recent.css';
import axios from "axios";
import { IoPlayCircleOutline } from "react-icons/io5";

const imageUrls = [
  "https://i.pinimg.com/736x/b9/82/6f/b9826fa011361fad23f252bfafa0f325.jpg",
  "https://i.pinimg.com/originals/19/0a/56/190a5625657ee70c0da1fd99ff7a139e.jpg",
  "https://wallpapers.com/images/hd/music-aesthetic-black-and-white-pfkhwsn5kijz9pyf.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhiJoOpZ8TW1UnFpIgbg3hqszZlkTSUtFmWA&s",
  "https://www.everythingabode.com/wp-content/uploads/2021/10/black-wallpaper-35.jpg.webp",
  "https://wallpapers.com/images/hd/moon-listening-to-music-phone-hyfsg2ogbdgczsx6.jpg",
  "https://e0.pxfuel.com/wallpapers/484/163/desktop-wallpaper-black-aesthetic-black-white-aesthetic-thumbnail.jpg",
  "https://wallpapercave.com/wp/wp11470585.jpg",
  "https://i.pinimg.com/736x/8d/fc/30/8dfc303a79df872e2d0a82100d5deb7e.jpg",
  "https://i.pinimg.com/736x/fc/98/63/fc986350e7bc09a28aba4a4bf5b18d2a.jpg",
  "https://i.pinimg.com/236x/ae/e8/f5/aee8f54ccfd0bb46c94af3291df0ae5c.jpg",
  "https://wallpapercave.com/wp/wp11470573.jpg",
  "https://e0.pxfuel.com/wallpapers/217/492/desktop-wallpaper-dark-retro-anime-aesthetic-anime.jpg",
  "https://e1.pxfuel.com/desktop-wallpaper/767/652/desktop-wallpaper-in-cyberscape-city-we-listen-to-music-on-cassette-tapes-1080x1920-for-your-mobile-tablet-music-tape-thumbnail.jpg",
  "https://i.pinimg.com/736x/41/4f/20/414f20f6b076db920cf6460c94de32de.jpg",
  "https://wallpapercave.com/wp/wp6657160.jpg",
  "https://i.pinimg.com/736x/24/9e/7c/249e7cdeec1aad48afd41c01e02eea1f.jpg",
  "https://images.wondershare.com/filmora/article-images/2022/aesthetic-background-music-1.jpg",
  "https://i.ytimg.com/vi/I3XjjNluM_E/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGFwgZShTMA8=&rs=AOn4CLC3lWjAmM6dUXZ5tRMUYwdLXLIkLg",
  "https://wallpapers.com/images/featured/aesthetic-music-background-glqd13geezby26pm.jpg",
  "https://wallpapers.com/images/hd/music-aesthetic-2000-x-2000-background-tokmkfmwt4ahm6g5.jpg",
  "https://cdn.shopify.com/app-store/listing_images/4a83367362785e93a425cd7711be3390/promotional_image/CL-bso-30f0CEAE=.png?height=720&width=1280",
  "https://i.pinimg.com/564x/6a/ca/d9/6acad9c3ab5e5646dfaf57da5c966f29.jpg",
  "https://i.pinimg.com/564x/88/a5/87/88a58703592ec18feba93cb548145381.jpg",
  "https://i.pinimg.com/736x/86/16/4f/86164f7adccbf4c35eccfb012f71a60b.jpg"

];

const getRandomImageUrl = () => {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

const removeAdjacentDuplicates = (arr) => {
  return arr.filter((item, index, self) => index === 0 || item !== self[index - 1]);
};

function Recent({ user, currentSongIndex, onPlay, baseURL }) {
  const [recents, setRecents] = useState([]);
  const [recentImages, setRecentImages] = useState([]); 

  useEffect(() => {
    console.log(user.email);
    
    axios.post(baseURL+"/grecent", { email: user.email }, { withCredentials: true })
      .then(response => {
        const filteredRecents = removeAdjacentDuplicates(response.data);
        setRecents(filteredRecents);

        const images = filteredRecents.map(() => getRandomImageUrl());
        setRecentImages(images);
        
        console.log(filteredRecents);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentSongIndex]);

  return (
    <div className="recent">
      <h2>Recently Played</h2>
      <div className="recent-box">
        {recents.slice(0, 20).map((val, index) => (
          <div key={index} className="recent-item">
            <img
              className="music-img"
              src={recentImages[index]} 
              alt={`Recent ${index}`}
            />
            <button
              className="play-btn"
              onClick={() => onPlay(index)}
            >
              <IoPlayCircleOutline fontSize={40} />
            </button>            
            <h3>{val}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recent;