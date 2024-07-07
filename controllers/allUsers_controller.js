import { UsersModel } from "../models/allUsers_model.js";

export const allUsers = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    //Check for validation error for the password and email fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    } else if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    if (firstName && lastName && email && password) {
        try {
            // Check if the user already exists by email
            const existingUser = await UsersModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }
    
            // Create a new user
            const newUser = new UsersModel({ firstName, lastName, email, password });
            await newUser.save();
    
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
}};




export const getUsers = async (req, res, next) => {
    try {
        const allUsers = await UsersModel.find()
        res.status(200).send(allUsers)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await UsersModel.findByIdAndUpdate(req.params.id, req.body)
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
        const deletedUser = await UsersModel.findByIdAndDelete(req.params.id)
        res.status(200).send('User deleted successfully')
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const oneUser = await UsersModel.findById(req.params.id)
        res.status(200).send(oneUser)
    } catch (error) {
        next(error)
    }
}