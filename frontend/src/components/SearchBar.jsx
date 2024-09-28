import React, { useState, useEffect } from "react";
import './css/search.css';

function SearchBar({ songs, onPlay, focus }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        const filtered = songs
            .map(song => song.name)
            .filter(val => val && val.toLowerCase().includes(searchTerm.toLowerCase())); // Check if val exists
        setFilteredSongs(filtered);
    }, [searchTerm, songs]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFocus = () => {
        setShowList(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowList(false);
        }, 100);
    };

    return (
        <div id="search">
            <input
                type="text"
                placeholder="Search for Songs"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {showList && filteredSongs.length > 0 && (
                <ul>
                    {filteredSongs.map((song, index) => (
                        <li key={index} onClick={() => onPlay(index)}>
                            {song}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
