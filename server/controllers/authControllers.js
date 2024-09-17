const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        const passwordmatch = await bcrypt.compare(password, user.password)
        if (!passwordmatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie("jwt", token, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.status(200).json({ message: "Succesful Login", user: user });
    } catch (err) {
        console.log(err);

        return res.status(500).json("Internal Server Error");
    }

}
exports.postRegister = async (req, res) => {
    try {
        const { email, password, name, mobile } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            mobile
        });
        await newUser.save();
        return res.status(201).json("User Created");
    } catch (err) {
        return res.status(500).json({ message: err });
        console.log(err);
    }

}
exports.getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
};
exports.logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {
            path: '/',
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.status(200).json({ message: "Logout Success" });
    } catch (err) {
        return res.status(500).json({ message: "Logout Failed" });
    }
}
