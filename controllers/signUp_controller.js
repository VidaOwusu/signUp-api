import { signUpModel } from "../models/signUp_model.js";

export const addUser = async (req, res, next) => {
    try {
        const addData = await signUpModel.create(req.body);
        res.status(201).send(addData);
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = [];
            if (error.errors.firstName) {
                messages.push('First name is required.');
            }
            if (error.errors.lastName) {
                messages.push('Last name is required.');
            }
            if (error.errors.email) {
                messages.push('Email is required.');
            }
            if (error.errors.password) {
                messages.push('Password is required.');
            }
            return res.status(400).json({
                error: messages
            });
        }

        // Handle duplicate key errors 
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
        next(error);
    }
};





export const getUsers = async (req, res, next) => {
    try {
        const allUsers = await signUpModel.find()
        res.status(200).send(allUsers)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await signUpModel.findByIdAndUpdate(req.params.id, req.body)
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
        const deletedUser = await signUpModel.findByIdAndDelete(req.params.id)
        res.status(200).send('User deleted successfully')
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const oneUser = await signUpModel.findById(req.params.id)
        res.status(200).send(oneUser)
    } catch (error) {
        next(error)
    }
}