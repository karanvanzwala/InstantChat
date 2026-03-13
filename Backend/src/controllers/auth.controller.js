import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }
        // check if emails valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });


        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName,
                email,
                message: "User created successfully",
            });

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }
        } else {
            return res.status(400).json({ message: "Invalid use Data" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password, "{{}}")

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid credentials" })
        // never tell the client wich one is incorrect:password or email

        const isPosswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPosswordCorrect) return res.status(400).json({ message: "Invalid credintial" })

        generateToken(user._id, res)
        res.status(200).json({
            _id: User._id,
            fullName: User.fullName,
            email: User.email,
            profilePic: User.profilePic,
            message: "User created successfully",
        })

    } catch (error) {
        console.error("Error in login conrtoller:", error)
        res.status(500).json({ message: "Internal server error" })
    }

}



export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out succesfully" })

}

export const updateProfile = async (req, res) => {

}