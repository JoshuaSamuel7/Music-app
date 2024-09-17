const Music = require('../models/songsSchema');
const upload = require('../config/cloudinary');

exports.getHome = (req, res) => {
    res.send("Hello");
    console.log(req.cookies);

}
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
        const user = await Music.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        audioFiles.forEach((file, index) => {
            const newSong = {
                name: Array.isArray(audioName)? audioName[index]: audioName,
                url: file.path
            };
            console.log(newSong);
            user.songs.push(newSong);
        });

        await user.save();
        res.status(200).json({ message: 'Files uploaded' });
        console.log("Musics Added");

    } catch (error) {
        console.error('Error adding song:', error);
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
        res.status(200).json(user.recentlyPlayed);
    } catch (err) {
        console.log(err);
    }

}