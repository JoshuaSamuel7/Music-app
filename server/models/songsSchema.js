const mongoose = require('mongoose');

const SongsSchema = new mongoose.Schema({
    name: String,
    email: String,
    songs: [],
    recentlyPlayed:[]
});

module.exports = mongoose.model('Music', SongsSchema);
