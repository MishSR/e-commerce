import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId, displayName, role) => {
    return jwt.sign(
        { userId, displayName, role },
        process.env.JWT_SECRET,
        { expiresIn: "1m", }
    );
};

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    return refreshToken;
};

return {token: refreshToken, userId};

const generatePassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const checkUserExists = async (email) => {
    const user = await User.findOne({ email });
    return user;
}


const register = async (req, res, next) => {
    try{
        const {displayName, email, password, phone} = req.body; 
        const userExists = await checkUserExists(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await generatePassword(password);
        const role = "guest";

        const newUser = new User({
            displayName,
            email,
            password: hashedPassword,
            phone,
            role
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', displayName, email, phone });
    }catch (error) {
        next(error);
    }

};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExists = await checkUserExists(email);
        if (!userExists) {
            return res.status(400).json({ message: 'User does not exist, you must sign in' });
        }

        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(userExists._id, userExists.displayName, userExists.role);
        const refreshToken = generateRefreshToken(userExists._id);

        res.status(200).json({ message: 'Login successful', token, refreshToken });
    } catch (error) {
        next(error);
    };  
};
