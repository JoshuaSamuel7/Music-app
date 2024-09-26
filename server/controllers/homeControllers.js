const Music = require('../models/songsSchema');
const upload = require('../config/cloudinary');
const User=require("../models/userSchema")
exports.getUserSongs = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Music.findOne({ email });
        if (!user || user.songs.length === 0) {
            return +res.status(404).json({ message: 'No songs found for this user' });
        }
        res.status(200).json({ songs: user.songs });
    }
    catch (error) {
        console.error('Error retrieving songs:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.addSongs = async (req, res) => {
    try {
        const { email } = req.body;
        const audioFiles = req.files['audio'];
        const audioName = req.body.filename;
        const currentUser = await User.findOne({ email: email });
        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        let user = await Music.findOne({ email: email });
        if (!user) {
            const newUser = new Music({
                email,
                name: currentUser.name,
                songs: [],
                recentlyPlayed: []
            });
            user = await newUser.save();
        }
        if (!Array.isArray(user.songs)) {
            user.songs = [];
        }
        audioFiles.forEach((file, index) => {
            const newSong = {
                name: Array.isArray(audioName) ? audioName[index] : audioName,
                url: file.path
            };
            user.songs.push(newSong);
        });
        await user.save();
        res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deleteSong = async (req, res) => {
    try {
        const { email, index } = req.body;
        const user = await Music.findOne({ email });
        if (!user) {
            return res.status(404).json("User not Found");
        }
        if (index < 0 || index >= user.songs.length) {
            return res.status(400).json("Invalid song index");
        }
        user.songs.splice(index, 1);
        await user.save();
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.postRecent = async (req, res) => {
    try {
        const { email, recent } = req.body;

        if (!recent) {
            return res.status(400).json("No recently played song provided");
        }

        const updatedUser = await Music.findOneAndUpdate(
            { email },
            { $push: { recentlyPlayed: { $each: [recent], $position: 0 } } }, // Add recent to the front of the array
        );

        if (!updatedUser) {
            return res.status(404).json("User not found");
        }

        res.status(200).json("Recently played updated successfully");

    } catch (err) {
        console.log(err);
        res.status(500).json("Error updating recently played");
    }
};

exports.getRecent = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Music.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        if(user.recentlyPlayed===null){
            return res.status(200).json("No Recent songs")
        }
        res.status(200).json(user.recentlyPlayed);
    } catch (err) {
        console.log(err);
    }

}