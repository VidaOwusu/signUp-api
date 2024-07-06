import { allUsersModel } from "../models/allUsers_model.js";

export const allUsers = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    //Check for validation error for the password and email fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    } else if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    if (firstName && lastName && email && password) {
        // Handle Signup
        try {
            // Check if the user already exists by email
            const existingUser = await allUsersModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }

            // Create a new user
            const newUser = new allUsersModel({ firstName, lastName, email, password });
            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully', newUser });
        } catch (error) {
        }
    } else {
        // Handle Login
        try {
            // Check if the user exists and the password matches
            const user = await allUsersModel.findOne({ email, password });
            if (!user) {
                return res.status(400).json({ error: ' invalid email or password' });
            }

            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            return next(error);
        }
    }
};




export const getUsers = async (req, res, next) => {
    try {
        const allUsers = await allUsersModel.find()
        res.status(200).send(allUsers)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await allUsersModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(updatedUser)
    } catch (error) {
        if (error.code === 11000) {
            const messages = [];
            if (error.keyValue.email) {
                messages.push('Email already exists.');
            }
            if (error.keyValue.password) {
                messages.push('Password already exists.');
            }
            return res.status(400).json({
                error: messages
            });
        }
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await allUsersModel.findByIdAndDelete(req.params.id)
        res.status(200).send('User deleted successfully')
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const oneUser = await allUsersModel.findById(req.params.id)
        res.status(200).send(oneUser)
    } catch (error) {
        next(error)
    }
}