const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator");
const transporter = require("../config/nodemailer");
const Otp=require('../models/otpModel')
const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "icloud.com"];
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
        const currentDomain=email.split("@")[1];
        if(!allowedDomains.includes(currentDomain)){
            console.log("domain err");
            return res.status(400).json({message:"Unsupported Email domain. Use emails with reputed domains like Gmail, Yahoo.."})
        }
        const genotp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false })
        console.log(genotp);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for JS Music Registration',
            text: text=`
            
            Hello ${name},
            
            Welcome to JS Music! We’re thrilled that you’re joining our music community, where you can enjoy and upload your favorite tunes.
            
            To complete your registration, please verify your email by entering the One-Time Password (OTP) below:
            
            Your OTP: ${genotp}
            
            This OTP is valid for 10 minutes. For security purposes, please do not share this code with anyone.
            
            If you did not request this email, please ignore it.
            
            Thank you for choosing JS Music. We're excited to have you onboard!
            
            Best regards,
            The JS Music Team
            https://jsmusic.vercel.app/login`
        })
        await Otp.findOneAndDelete({email});
        const newOTP= new Otp({
            email,
            otp:genotp,
        })
        await newOTP.save()
        return res.status(200).json({ message: "OTP sent Successfully" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "OTP Failed" });
    }

}
exports.verifyOTP = async (req, res) => {
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
        return res.status(201).json({message:"User Created"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registrtation Failed" })
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
