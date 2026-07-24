import bcrypt from "bcrypt"
import User from "../models/User";

const register = async((req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User Registed successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    } 
})   

export default register;